import React, { useState, useEffect } from "react";

const TestScreen = ({ logEvent, logs, saveLogsToFile }) => {
    // Track mouse movements
    useEffect(() => {
        const handleMouseMove = (event) => {
            logEvent("Mouse Move", { x: event.clientX, y: event.clientY });
        };

        const handleKeyPress = (event) => {
            logEvent("Key Press", `Key: ${event.key}`);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [logEvent]);

    return (
        <div className="test-screen" style={styles.container}>
            <h1 style={styles.heading}>Testing Page</h1>
            <p style={styles.text}>Interact with this page to generate logs.</p>

            <button style={styles.button} onClick={() => logEvent("Button Click", "Test Button Clicked")}>
                Click Me
            </button>

            {/* Download Logs Button */}
            <button style={styles.downloadButton} onClick={saveLogsToFile}>
                Download Logs
            </button>

            {/* Display logs dynamically */}
            <div style={styles.logContainer}>
                <h2 style={styles.logHeading}>Logs</h2>
                <ul style={styles.logList}>
                    {logs.map((log, index) => (
                        <li key={index} style={styles.logItem}>
                            <strong>{log.time}:</strong> [{log.type}] {log.details}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
    },
    heading: {
        fontSize: "28px",
        marginBottom: "10px",
    },
    text: {
        fontSize: "18px",
        marginBottom: "20px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        marginRight: "10px",
    },
    downloadButton: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
    },
    logContainer: {
        marginTop: "30px",
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
        maxWidth: "80%",
        margin: "0 auto",
    },
    logHeading: {
        fontSize: "22px",
        borderBottom: "2px solid #007bff",
        paddingBottom: "5px",
        marginBottom: "10px",
    },
    logList: {
        listStyleType: "none",
        padding: "0",
        maxHeight: "300px",
        overflowY: "auto",
    },
    logItem: {
        fontSize: "14px",
        padding: "5px 0",
        borderBottom: "1px solid #ddd",
        wordWrap: "break-word",
    },
};

export default TestScreen;
