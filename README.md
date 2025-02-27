# Passive CAPTCHA & Bot Detection
`pls bare with me. Once project completes the AI readme will be changed.Trust me!`
## Project Overview
This project implements a **Passive CAPTCHA & Bot Detection System** using **mouse movements, keyboard events, and button clicks** to differentiate between human and bot interactions. It logs user interactions and processes the data using a **RandomForest classifier** to classify behavior.

### Key Features
  **Tracks User Interactions** – Captures mouse movements, key presses, and button clicks.  
  **Dynamic Button Placement** – Generates random buttons for interaction logging.  
  **Real-time Logging** – Stores user events and periodically sends them to a backend.  
  **Bot Detection Model** – Processes extracted features to classify interactions as human or bot.  
  **Saves Logs in JSON** – Logs interactions and saves them when a button is clicked.  

---

## Project Structure
```
Passive-CAPTCHA
│── backend/                     # Backend API for data processing
│── frontend/                    # React-based user interaction tracker
│── models/                      # ML models for bot detection
│── data/                        # JSON files of user interaction logs
│── mouse_features.csv           # Processed dataset for training/testing
│── bot_detector.pkl             # Trained RandomForest model
│── README.md                    # Project documentation
```

---

## Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/yourusername/passive-captcha.git
cd passive-captcha
```

### Install Dependencies
#### 🔹 Frontend (React-based Interaction Tracker)
```bash
cd frontend
npm install
npm start
```

#### 🔹 Backend (Flask-based API for Processing)
```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

## Usage

1️⃣ **Start the frontend** (React App) – Opens a web page where user interactions are tracked.  
2️⃣ **Move the mouse, press keys, or click buttons** – Interactions are logged in real-time.  
3️⃣ **Logs are saved as JSON files** when a button is clicked.  
4️⃣ **Backend processes the JSON files** and extracts features for bot classification.  
5️⃣ **The trained model (RandomForest) predicts whether the user is a bot or human.**

---

## Data Processing & Machine Learning
The **backend** extracts interaction features from JSON logs and normalizes them before feeding into a **RandomForestClassifier**. 

### Feature Extraction
- **Speed, Acceleration, and Jerk** of mouse movements.
- **Curvature of movement paths**.
- **Total distance traveled**.
- **Number of keypress events**.
- **Click frequency and button interaction patterns.**

### Model Training
The dataset (`mouse_features.csv`) is used to train a **RandomForestClassifier**, which is saved as `bot_detector.pkl`. This model classifies whether the interaction pattern resembles a bot.

---

## License
This project is licensed under the **GPL-3.0 license**.

---

## Contributing
Feel free to contribute! Submit a PR or open an issue for feature requests or bug fixes.
