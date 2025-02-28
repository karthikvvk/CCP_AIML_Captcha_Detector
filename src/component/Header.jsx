import React from "react";
import { FaUniversity } from "react-icons/fa"; // Government-style icon

const Header = () => {
    return (
        <header style={styles.header}>
            <FaUniversity style={styles.logo} />
            <h1 style={styles.title}>Government Portal</h1>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: "#0033a1",
        color: "white",
        padding: "20px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "15px",
    },
    logo: {
        fontSize: "50px",
    },
    title: {
        fontSize: "2em",
        margin: 0,
    },
};

export default Header;
