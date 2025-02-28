import React, { useEffect, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TestScreen from "./pages/TestScreen";
import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";

// Function to save logs to JSON file only when the button is clicked
const saveLogsToFile = (logs) => {
    if (logs.length === 0) return;

    const fileData = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(fileData);
    const a = document.createElement("a");
    a.href = url;
    a.download = "logs.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

const App = () => {
    const [logs, setLogs] = useState([]);
    const logsRef = useRef([]); // Store logs without triggering re-renders

    // Function to log events
    const logEvent = (eventType, eventDetails) => {
        const logEntry = {
            time: new Date().toLocaleTimeString(),
            type: eventType,
            details: typeof eventDetails === "object" ? JSON.stringify(eventDetails, null, 2) : eventDetails,
        };

        logsRef.current = [...logsRef.current, logEntry];
        setLogs([...logsRef.current]);
        console.log(logEntry);
    };

    useEffect(() => {
        // Capture system info on mount
        logEvent("System Info", {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
        });

        // Event listeners
        const handleMouseClick = (e) => logEvent("Mouse Click", { button: e.button, x: e.clientX, y: e.clientY });
        const handleKeyDown = (e) => logEvent("Key Down", { key: e.key });
        const handleScroll = () => logEvent("Scroll", { scrollY: window.scrollY });
        const handleResize = () => logEvent("Resize", { width: window.innerWidth, height: window.innerHeight });

        // Attach listeners
        window.addEventListener("click", handleMouseClick);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("click", handleMouseClick);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="app-container">
           
            <div className="main-contents">
                <Routes>
                    <Route path="/" element={<Home logEvent={logEvent} />} />
                    <Route path="/test" element={<TestScreen logEvent={logEvent} logs={logs} saveLogsToFile={() => saveLogsToFile(logs)} />} />
                </Routes>
            </div>
            
        </div>
    );
};

export default App;
