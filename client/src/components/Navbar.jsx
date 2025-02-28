import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>
          Vehicle Service
        </Link>
      </div>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/components" style={styles.link}>
            Components
          </Link>
        </li>
        <li>
          <Link to="/vehicles" style={styles.link}>
            Vehicles
          </Link>
        </li>
        <li>
          <Link to="/repairs" style={styles.link}>
            Repairs
          </Link>
        </li>
        <li>
          <Link to="/revenue" style={styles.link}>
            Revenue
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#333",
    color: "#fff",
    height: "fit-content",
  },
  logo: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "1rem",
  },

  link: {
    textDecoration: "none",
    color: "green",
  },
};

export default Navbar;
