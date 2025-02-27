import React, { useState, useEffect } from "react";

function App() {
  const [mouseLog, setMouseLog] = useState([]);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    // Generate 20 random button positions
    const generatedButtons = Array.from({ length: 50 }, (_, index) => ({
      id: `button_${index + 1}`,
      name: `Button ${index + 1}`,
      x: Math.floor(Math.random() * (window.innerWidth - 10)),
      y: Math.floor(Math.random() * (window.innerHeight - 10)),
    }));
    setButtons(generatedButtons);
  }, []);

  // Track mouse movement
  useEffect(() => {
    const trackMouse = (e) => {
      setMouseLog((prev) => [...prev, { x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener("mousemove", trackMouse);
    return () => window.removeEventListener("mousemove", trackMouse);
  }, []);

  // Save log as JSON file
  const saveLog = (buttonId) => {
    const jsonString = JSON.stringify(mouseLog, null, 2);
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
      <h1>Mouse Tracking & Button Click</h1>
      {buttons.map((btn) => (
        <button
          key={btn.id}
          onClick={() => saveLog(btn.id)}
          style={{
            position: "fixed",
            left: btn.x,
            top: btn.y,
            width: "90px",
            height: "60px",
            backgroundColor: "red",
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
