import { useActionData, useNavigate} from "react-router-dom";

// eventtracker.js
export const captureEvent = (eventType, eventData) => {
  const navigate =useNavigate()
  const eventLog = {
    eventType,
    eventData,
    timestamp: new Date().toISOString(),
  };

  // Debugging: Log event before sending
  console.log("Captured Event:", eventLog);

  // Send to backend and then redirect to home if successful
  sendToBackend(eventLog);
};

const sendToBackend = async (eventLog) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventLog),
    });


  } catch (error) {
    console.error("Error sending event:", error);
  }
};
