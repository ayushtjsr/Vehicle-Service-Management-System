import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <div
  style={{
    ...styles.container,
    fontFamily: "'Courier New', monospace",
    color: 'white',
    backgroundImage: 'url("D:\Data D\VehicleServiceManagementSystem-main.jpg")', // Replace with your image path
    backgroundSize: 'cover', // Optional: to cover the entire div
    backgroundPosition: 'center', // Optional: to center the image
  }}
></div>
      <header style={{ ...styles.container, fontFamily: "'Courier New', monospace",fontSize:30,color: 'white'}}>
        <h1>Welcome to the Vehicle Service Management System</h1>
      

        <p>
          Manage components, track vehicles, handle repairs, and visualize
          revenue effortlessly.
        </p>
      </header>
      
      <div style={styles.features}>
        <div style={styles.featureCard}>
          <h2>Manage Components</h2>
          <p>Register, update, and manage pricing for vehicle components.</p>
          <Link to="/components">
            <button style={styles.button}>Go to Components</button>
          </Link>
        </div>
        <div style={styles.featureCard}>
          <h2>Track Vehicles</h2>
          <p>Monitor vehicle repair statuses and related details.</p>
          <Link to="/vehicles">
            <button style={styles.button}>Go to Vehicles</button>
          </Link>
        </div>
        <div style={styles.featureCard}>
          <h2>Repair Management</h2>
          <p>Log issues, select components, and calculate repair costs.</p>
          <Link to="/repairs">
            <button style={styles.button}>Go to Repairs</button>
          </Link>
        </div>
        <div style={styles.featureCard}>
          <h2>Revenue Analytics</h2>
          <p>Visualize daily, monthly, and yearly revenue trends.</p>
          <Link to="/revenue">
            <button style={styles.button}>Go to Revenue</button>
          </Link>
        </div>
      </div>
    </div>
  );
};


const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
    backgroundColor:"green",
    backgroundImage: 'url("VehicleServiceManagementSystem-main.jpg")',
  },
  header: {
    marginBottom: "2rem",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  featureCard: {
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default HomePage;
