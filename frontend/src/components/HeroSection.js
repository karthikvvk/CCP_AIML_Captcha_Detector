import React, { useState, useEffect } from "react";
import banner from "../assets/hero_bg.jpg";

import banner1 from "../assets/DocumentUpdateBanner.jpg";
import banner2 from "../assets/NEET-Web-Banner.jpg";

const HeroSection = () => {
  const images = [
    { src: banner, link: "https://bhuvan.nrsc.gov.in/aadhaar/" },
    { src: banner1, link: "https://bhuvan.nrsc.gov.in/aadhaar/" },
    { src: banner2, link: "https://bhuvan.nrsc.gov.in/aadhaar/" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]); // ✅ Fixed: added images.length to dependency array

  const handleClick = () => {
    window.open(images[currentIndex].link, "_blank");
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div style={styles.heroContainer}>
      <div
        style={{ ...styles.heroBackground, backgroundImage: `url(${images[currentIndex].src})` }}
        onClick={handleClick}
      ></div>

      {/* Navigation Buttons */}
      <button style={styles.prevButton} onClick={handlePrev}>❮</button>
      <button style={styles.nextButton} onClick={handleNext}>❯</button>
    </div>
  );
};

const styles = {
  heroContainer: {
    height: "450px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: "20px",
    overflow: "hidden",
    cursor: "pointer",
  },
  heroBackground: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    transition: "opacity 1s ease-in-out",
  },
  prevButton: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    fontSize: "20px",
  },
  nextButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    fontSize: "20px",
  },
};

export default HeroSection;
