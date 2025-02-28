import React from "react";


const Footer = () => {
  const footerStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "white",
    color: "grey",
    textAlign: "center",
    padding: "10px 0",
    zIndex: 10,
    boxShadow: "0 -2px 5px rgba(226, 217, 217, 0.1)"
  };

  return (
    <footer style={footerStyle}>
      Copyright © 28/02/2025 Ayush
    </footer>
  );
};

export default Footer;
