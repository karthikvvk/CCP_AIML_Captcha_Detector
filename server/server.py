from flask import Flask, request, jsonify
import threading
import queue
import joblib
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from concurrent.futures import ThreadPoolExecutor
from collections import deque
import logging

app = Flask(__name__)

# Load model and scaler
model = joblib.load("mouse movements_model.pkl")
scaler = joblib.load("mouse movements_scalar.pkl")

# Feature list
FEATURES = [
    "avg_speed", "max_speed", "avg_acceleration", "max_acceleration",
    "avg_jerk", "max_jerk", "avg_curvature", "max_curvature",
    "total_distance", "num_points", "total_time"
]

# Queue and predictions list
request_queue = queue.Queue()
predictions_list = deque(maxlen=1000)  # Limit size for memory efficiency
lock = threading.Lock()

# Logging setup
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def euclidean_distance(p1, p2):
    """Compute Euclidean distance between two points."""
    return np.hypot(p2["x"] - p1["x"], p2["y"] - p1["y"])

def extract_features(mouse_data):
    """Extracts movement features from mouse path."""
    if len(mouse_data) < 2:
        return dict.fromkeys(FEATURES, 0)

    speeds, accelerations, jerks, curvatures = [], [], [], []
    total_distance = sum(euclidean_distance(mouse_data[i-1], mouse_data[i]) for i in range(1, len(mouse_data)))
    total_time = max(mouse_data[-1]["t"] - mouse_data[0]["t"], 1e-6)
    
    for i in range(1, len(mouse_data)):
        p1, p2 = mouse_data[i - 1], mouse_data[i]
        distance = euclidean_distance(p1, p2)
        time_diff = max(p2["t"] - p1["t"], 1e-6)
        speed = distance / time_diff

        speeds.append(speed)
        if i > 1:
            acceleration = (speed - speeds[-2]) / time_diff
            accelerations.append(acceleration)
            if len(accelerations) > 1:
                jerks.append((acceleration - accelerations[-2]) / time_diff)

        if i > 1:
            p0 = mouse_data[i - 2]
            v1, v2 = np.array([p1["x"] - p0["x"], p1["y"] - p0["y"]]), np.array([p2["x"] - p1["x"], p2["y"] - p1["y"]])
            norm1, norm2 = np.linalg.norm(v1), np.linalg.norm(v2)
            if norm1 > 0 and norm2 > 0:
                curvatures.append(np.arccos(np.clip(np.dot(v1, v2) / (norm1 * norm2), -1.0, 1.0)))
    
    return {
        "avg_speed": np.mean(speeds), "max_speed": max(speeds, default=0),
        "avg_acceleration": np.mean(accelerations), "max_acceleration": max(accelerations, default=0),
        "avg_jerk": np.mean(jerks), "max_jerk": max(jerks, default=0),
        "avg_curvature": np.mean(curvatures), "max_curvature": max(curvatures, default=0),
        "total_distance": total_distance, "num_points": len(mouse_data), "total_time": total_time
    }

def process_request():
    """Worker function to process queued requests."""
    while True:
        mouse_data = request_queue.get()
        if mouse_data is None:
            break  # Exit worker
        try:
            features_dict = extract_features(mouse_data)
            df = pd.DataFrame([features_dict])
            df[FEATURES] = scaler.transform(df[FEATURES])

            prediction = model.predict(df)[0]
            prob = model.predict_proba(df)[0][1]
            result = 1 if prob >= 0.4 else 0

            with lock:
                predictions_list.append(result)

            logging.info(f"Prediction: {'BOT' if result else 'HUMAN'}")
        except Exception as e:
            logging.error(f"Error processing request: {e}")
        finally:
            request_queue.task_done()

# Start worker threads
NUM_THREADS = 30
executor = ThreadPoolExecutor(max_workers=NUM_THREADS)
for _ in range(NUM_THREADS):
    executor.submit(process_request)  # already correct – just remove the trailing parentheses if added

@app.route("/predict", methods=["POST"])
def predict():
    """Enqueue prediction request."""
    try:
        request_queue.put(request.json)
        return "", 204
    except Exception as e:
        logging.error(f"Predict route error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/check", methods=["GET"])
def check():
    """Return overall classification."""
    with lock:
        if not predictions_list:
            return jsonify({"result": "UNKNOWN", "message": "No data"}), 200

        result = "BOT" if np.mean(predictions_list) >= 0.5 else "HUMAN"
        predictions_list.clear()
    
    logging.info(f"Final classification: {result}")
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True, threaded=True)
