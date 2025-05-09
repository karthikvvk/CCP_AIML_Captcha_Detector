import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const EventListenerProvider = ({ children }) => {
  const [mouseMoves, setMouseMoves] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const newMove = {
        x: event.clientX,
        y: event.clientY,
        t: Date.now() / 1000,
      };
      setMouseMoves((prev) => [...prev, newMove]);
    };

    document.addEventListener("mousemove", handleMouseMove);

    const timer = setInterval(() => {
      if (mouseMoves.length > 0) {
        axios
          .post("http://127.0.0.1:5000/predict", mouseMoves, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            console.log("Mouse move data sent successfully:", response.data);
            setResponses((prev) => [...prev, response.data.prediction]);
          })
          .catch((error) => {
            console.error("Error sending mouse move data:", error);
          });
      }
    }, 500);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timer);
    };
  }, [mouseMoves]);

  const handleRedirectRequest = useCallback(() => {
    const botCount = responses.filter((res) => res === "BOT").length;
    const humanCount = responses.filter((res) => res === "HUMAN").length;
    const totalCount = botCount + humanCount;

    if (totalCount === 0) {
      alert("Not enough data to determine authenticity.");
      return;
    }

    const humanProbability = humanCount / totalCount;

    if (humanProbability > 0.7) {
      window.location.href = "/";
    } else {
      alert("❌ You are identified as a bot. Access denied!");
    }
  }, [responses]);

  useEffect(() => {
    const handleRedirect = () => {
      handleRedirectRequest();
    };

    window.addEventListener("redirect", handleRedirect);

    return () => {
      window.removeEventListener("redirect", handleRedirect);
    };
  }, [handleRedirectRequest]);

  return <>{children}</>;
};

export default EventListenerProvider;
