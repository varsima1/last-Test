import React, { useState, useEffect } from "react";
import "./scss/Darkmode/styles.scss";

export default function Darkmode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"} style={{backgroundColor:'transparent',}}>
      <div className="container">
        <span style={{ color: darkMode ? "grey" : "yellow", fontSize: "30px" }}>
          ☀︎
        </span>
        <div className="switch-checkbox">
          <label className="switch">
            <input type="checkbox" onChange={toggleDarkMode} />
            <span className="slider round" > </span>
          </label>
        </div>
        <span
          style={{
            color: darkMode ? "#c96dfd" : "grey",
            fontSize: "30px",
          }}
        >
          ☽
        </span>
      </div>
    </div>
  );
}
