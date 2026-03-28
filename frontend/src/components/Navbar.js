import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { dark, setDark } = useContext(ThemeContext);

  <button onClick={() => setDark(!dark)}>
    {dark ? "🌙 Dark" : "☀️ Light"}
  </button>

  // 🔥 DETECT SCROLL
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItem = (path, name) => (
    <Link
      to={path}
      style={{
        textDecoration: "none",
        color: location.pathname === path ? "#00e5ff" : "#eee",
        fontWeight: "600",
        position: "relative",
        padding: "8px 12px",
        transition: "0.3s"
      }}
      onMouseEnter={(e) => (e.target.style.color = "#00e5ff")}
      onMouseLeave={(e) =>
        (e.target.style.color =
          location.pathname === path ? "#00e5ff" : "#eee")
      }
    >
      {name}

      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: location.pathname === path ? "100%" : "0%",
          background: "#00e5ff",
          boxShadow: "0 0 8px #00e5ff",
          transition: "0.3s"
        }}
      />
    </Link>
  );

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,

          /* 🔥 MAGIC FIX */
          background: scrolled
            ? "rgba(0,0,0,0.6)"   // when scrolling (glass dark)
            : "rgba(0,0,0,0.8)",  // at top (NO WHITE issue)

          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",

          borderBottom: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 5px 20px rgba(0,0,0,0.4)",

          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "0.3s ease"
        }}
      >
        {/* LOGO */}
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#00e5ff",
            textShadow: "0 0 10px #00e5ff"
          }}
        >
          💉 VaccineApp
        </div>

        {/* NAV */}
        <div style={{ display: "flex", gap: "30px" }}>
          {navItem("/", "HOME")}
          {navItem("/dashboard", "DASHBOARD")}
          {navItem("/add", "ADD")}
          {navItem("/login", "LOGIN")}
          {navItem("/register", "REGISTER")}
        </div>
      </div>

      {/* GLOW LINE */}
      <div
        style={{
          height: "3px",
          background: "linear-gradient(90deg, #00e5ff, #ff00ff, #00ff88)",
          boxShadow: "0 0 15px rgba(0,255,255,0.8)"
        }}
      />
    </>
  );
}