import React from "react";
import { Link } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";

const Home = ({ logEvent }) => {
    return (
        <div style={styles.container}>
            {/* Header Section */}
            <header style={styles.header}>
                <FaUniversity style={styles.logo} />
                <h1 style={styles.title}>Government of India</h1>
                <p style={styles.tagline}>Ensuring Security & Trust in Digital Identity</p>
            </header>

            {/* Main Content */}
            <main style={styles.main}>
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>About This Portal</h2>
                    <p style={styles.text}>
                        This portal uses cutting-edge **Artificial Intelligence** to ensure secure and 
                        reliable authentication, distinguishing between **human users and automated bots**.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Our Services</h2>
                    <ul style={styles.list}>
                        <li>✔️ AI-powered bot detection</li>
                        <li>✔️ Secure identity verification</li>
                        <li>✔️ Data privacy & protection</li>
                        <li>✔️ 24/7 digital accessibility</li>
                    </ul>
                </section>

                {/* Navigation Button */}
                <Link 
                    to="/test" 
                    style={styles.link} 
                    onClick={() => logEvent("Navigation", "Visited Test Page")}
                >
                    Proceed to Verification
                </Link>
            </main>

            {/* Footer Section */}
            <footer style={styles.footer}>
                <p>&copy; 2025 Government of India | Ministry of Electronics & IT</p>
                <p>📍 UIDAI | New Delhi, India</p>
                <p>📞 Helpline: 1800-XXXX-XXXX | ✉️ support@gov.in</p>
            </footer>
        </div>
    );
};

// Internal CSS Styling
const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: "#f8f9fa",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    header: {
        backgroundColor: "#012970", // Dark Blue (UIDAI Theme)
        color: "white",
        padding: "20px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
    logo: {
        fontSize: "80px",
        marginBottom: "10px",
    },
    title: {
        fontSize: "2.8em",
        fontWeight: "bold",
        margin: 0,
    },
    tagline: {
        fontSize: "1.2em",
        fontStyle: "italic",
        opacity: 0.9,
    },
    main: {
        margin: "40px 0",
        padding: "0 15px",
    },
    section: {
        marginBottom: "30px",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
        maxWidth: "700px",
        marginLeft: "auto",
        marginRight: "auto",
    },
    sectionTitle: {
        fontSize: "1.8em",
        color: "#012970",
        borderBottom: "2px solid #ffcc00",
        display: "inline-block",
        paddingBottom: "5px",
        marginBottom: "10px",
    },
    text: {
        fontSize: "1.2em",
        color: "#333",
        lineHeight: "1.5",
    },
    list: {
        listStyle: "none",
        padding: 0,
        fontSize: "1.2em",
        color: "#333",
    },
    link: {
        display: "inline-block",
        marginTop: "25px",
        padding: "12px 25px",
        backgroundColor: "#ffcc00", // UIDAI Yellow
        color: "#012970",
        textDecoration: "none",
        borderRadius: "5px",
        fontWeight: "bold",
        fontSize: "1.2em",
        transition: "background 0.3s",
    },
    footer: {
        marginTop: "auto",
        padding: "20px 0",
        backgroundColor: "#012970",
        color: "white",
        fontSize: "0.9em",
    },
};

export default Home;
