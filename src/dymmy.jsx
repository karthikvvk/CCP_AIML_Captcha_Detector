import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState({});
  const [interactionLog, setInteractionLog] = useState([]);

  // Capture environment data
  const captureEnvironmentDetails = () => {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezoneOffset: new Date().getTimezoneOffset(),
      colorDepth: window.screen.colorDepth,
      hardwareConcurrency: navigator.hardwareConcurrency || "Unknown",
      memory: navigator.deviceMemory || "Unknown",
      touchSupport:
        "ontouchstart" in window || navigator.maxTouchPoints > 0,
    };
  };

  // Track mouse movements
  const trackMouseMovement = (e) => {
    const event = {
      type: "Mouse Movement",
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
    updateLog(event);
  };

  // Track key presses
  const trackKeyboardEvents = (e) => {
    const event = {
      type: "Key Press",
      key: e.key,
      code: e.code,
      time: Date.now(),
    };
    updateLog(event);
  };

  // Update interaction log
  const updateLog = (event) => {
    setInteractionLog((prevLog) => [...prevLog.slice(-49), event]);
  };

  // Periodically send data to the backend
  useEffect(() => {
    const interval = setInterval(() => {
      const dataToSend = {
        environmentDetails: userData,
        interactions: interactionLog,
      };

      // Send data to the backend
      axios
        .post("http://localhost:5000/api/capture", dataToSend)
        .then((response) => console.log("Data sent to backend:", response.data))
        .catch((error) => console.error("Error sending data:", error));
    }, 10000);

    return () => clearInterval(interval);
  }, [userData, interactionLog]);

  // Capture environment data on load
  useEffect(() => {
    setUserData(captureEnvironmentDetails());
    window.addEventListener("mousemove", trackMouseMovement);
    document.addEventListener("keydown", trackKeyboardEvents);

    return () => {
      window.removeEventListener("mousemove", trackMouseMovement);
      document.removeEventListener("keydown", trackKeyboardEvents);
    };
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Passive CAPTCHA Solution</h1>
      <h2>Environment Details</h2>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <h2>Interaction Log</h2>
      <ul style={{ maxHeight: "300px", overflowY: "scroll" }}>
        {interactionLog.map((log, index) => (
          <li key={index}>
            {log.type} - {JSON.stringify(log)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
