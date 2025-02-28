import React, { useState, useEffect } from "react";

function App() {
  const [interactionLog, setInteractionLog] = useState([]);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    // Generate 50 random button positions
    const generatedButtons = Array.from({ length: 10 }, (_, index) => ({
      id: `button_${index + 1}`,
      name: `Button ${index + 1}`,
      x: Math.floor(Math.random() * (window.innerWidth - 100)), // Adjusted for button width
      y: Math.floor(Math.random() * (window.innerHeight - 60)), // Adjusted for button height
    }));
    setButtons(generatedButtons);
  }, []);

  // Track Mouse Movement
  useEffect(() => {
    const trackMouse = (e) => {
      setInteractionLog((prev) => [
        ...prev.slice(-199), // Keep only the last 200 interactions
        { type: "Mouse Movement", x: e.clientX, y: e.clientY, time: Date.now() },
      ]);
    };
    window.addEventListener("mousemove", trackMouse);
    return () => window.removeEventListener("mousemove", trackMouse);
  }, []);

  // Track Key Presses
  useEffect(() => {
    const trackKeys = (e) => {
      setInteractionLog((prev) => [
        ...prev.slice(-199),
        { type: "Key Press", key: e.key, code: e.code, time: Date.now() },
      ]);
    };
    document.addEventListener("keydown", trackKeys);
    return () => document.removeEventListener("keydown", trackKeys);
  }, []);

  // Track Button Clicks
  const handleButtonClick = (buttonId) => {
    setInteractionLog((prev) => [
      ...prev.slice(-199),
      { type: "Button Click", buttonId, time: Date.now() },
    ]);
    saveLog(buttonId);
  };

  // Save Log as JSON file
  const saveLog = (buttonId) => {
    const jsonString = JSON.stringify(interactionLog, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `${buttonId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Interaction Tracking</h1>
      <p>Move the mouse, press keys, or click buttons to log interactions.</p>

      {buttons.map((btn) => (
        <button
          key={btn.id}
          onClick={() => handleButtonClick(btn.id)}
          style={{
            position: "fixed",
            left: btn.x,
            top: btn.y,
            width: "90px",
            height: "60px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {btn.name}
        </button>
      ))}
    </div>
  );
}

export default App;
