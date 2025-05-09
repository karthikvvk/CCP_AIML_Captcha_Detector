import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Event capture functions to log and send events to the backend.
export const captureEvent = (eventType, eventData) => {
  const eventLog = {
    eventType,
    eventData,
    timestamp: new Date().toISOString(),
  };

  console.log("Captured Event:", eventLog);
  sendToBackend(eventLog);
};

const sendToBackend = async (eventLog) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventLog),
    });
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    console.log(response.body);
  } catch (error) {
    console.error("Error sending event:", error);
  }
};

const LoginPage = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [error, setError] = useState("");
  const [eventLogs, setEventLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let lastKeyPressTime = 0;
    let lastClickTime = 0;
    let mouseMovements = [];

    const handleKeyPress = () => {
      const now = Date.now();
      const speed = now - lastKeyPressTime; 
      lastKeyPressTime = now;
      const eventData = { speed };
      // Log event locally
      logEvent("keypress", eventData);
      // Capture event for backend
      captureEvent("keypress", eventData);
    };

    const handleMouseMove = (e) => {
      if (mouseMovements.length > 50) mouseMovements.shift(); // Only keep last 50 moves
      mouseMovements.push({ x: e.clientX, y: e.clientY });

      const pattern = detectMousePattern(mouseMovements);
      const eventData = { pattern };
      logEvent("mousemove", eventData);
      captureEvent("mousemove", eventData);
    };

    const handleClick = () => {
      const now = Date.now();
      const interval = now - lastClickTime; 
      lastClickTime = now;
      const eventData = { interval };
      logEvent("click", eventData);
      captureEvent("click", eventData);
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const logEvent = (eventType, eventData) => {
    setEventLogs((prev) => [...prev, { eventType, eventData }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{16}$/.test(aadhaarNumber)) {
      setError("Aadhaar number must be a 16-digit number.");
      return;
    }

    // Capture the form submission event
    captureEvent("formSubmit", { aadhaarNumber });

    const botScore = analyzeBotScore(eventLogs);
    if (botScore > 3) {
      captureEvent("botDetected", { botScore });
      setError("Bot activity detected! Access Denied ❌");
    } else {
      captureEvent("loginSuccess", { aadhaarNumber, botScore });
      navigate("/home");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Login to Aadhaar</h2>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Enter Aadhaar Number</label>
          <input
            type="text"
            maxLength="16"
            placeholder="Enter Aadhaar"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            required
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// **Mouse Pattern Detection**
const detectMousePattern = (movements) => {
  if (movements.length < 10) return "smooth"; // Not enough data to decide

  let linearMovements = 0;
  for (let i = 1; i < movements.length; i++) {
    if (Math.abs(movements[i].x - movements[i - 1].x) < 3 &&
        Math.abs(movements[i].y - movements[i - 1].y) < 3) {
      linearMovements++;
    }
  }
  return linearMovements / movements.length > 0.8 ? "linear" : "random";
};

// **Bot Score Analysis**
const analyzeBotScore = (eventLogs) => {
  let botScore = 0;
  eventLogs.forEach(({ eventType, eventData }) => {
    if (eventType === "keypress" && eventData.speed < 50) botScore++; // Fast typing might be bot-like
    if (eventType === "mousemove" && eventData.pattern === "linear") botScore++; // Unnaturally straight movements
    if (eventType === "click" && eventData.interval < 50) botScore++; // Very rapid clicks
  });
  return botScore;
};

// Styles
const styles = {
  container: { fontFamily: "Arial", textAlign: "center", padding: "20px", minHeight: "100vh" },
  loginBox: { background: "white", width: "350px", margin: "20px auto", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" },
  title: { color: "#333", marginBottom: "15px" },
  label: { display: "block", textAlign: "left", margin: "10px 0 5px", fontWeight: "bold" },
  input: { width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px" },
  button: { backgroundColor: "#0066cc", color: "white", padding: "10px", borderRadius: "5px", width: "100%", fontSize: "16px", cursor: "pointer" },
  error: { color: "red", fontSize: "14px" },
};

export default LoginPage;
