import React from "react";

const SidePanel = ({ logs }) => {
    return (
        <div className="side-panel">
            <h3>Activity Logs</h3>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>
                        <strong>{log.time}</strong> - {log.type}: {JSON.stringify(log.details)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidePanel;
