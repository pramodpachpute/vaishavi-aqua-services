import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const phoneNumber = "919405439494";

  const whatsappMessage =
    "Hi Vaishnavi Enterprises, I would like to know more about your water purifier sales and services.";

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* ================= BRAND ================= */}

        <a
          href="#home"
          className="brand"
          onClick={closeMenu}
        >
          <div className="brand-logo-wrapper">
            <img
              src="/images/logo.png"
              alt="Vaishnavi Enterprises"
              className="brand-logo"
            />
          </div>

          <div className="brand-text">
            <h2>Vaishnavi Enterprises</h2>
            <p>RO • UV • UF Water Purifier</p>
          </div>
        </a>

        {/* ================= NAVIGATION ================= */}

        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={closeMenu}>
            Home
          </a>

          <a href="#about" onClick={closeMenu}>
            About
          </a>

          <a href="#services" onClick={closeMenu}>
            Services
          </a>

          <a href="#products" onClick={closeMenu}>
            Products
          </a>

          <a href="#reviews" onClick={closeMenu}>
            Reviews
          </a>

          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>

        {/* ================= RIGHT SIDE ================= */}

        <div className="navbar-actions">

          {/* PHONE */}

          <a
            href={`tel:+${phoneNumber}`}
            className="phone-info-card"
          >
            <div className="phone-info-icon">
              ☎
            </div>

            <div className="phone-info-text">
              <span>Call Us Now</span>
              <strong>+91 9405439494</strong>
            </div>
          </a>

          {/* WHATSAPP */}

          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-button"
          >
            <span className="action-icon">●</span>
            <span>WhatsApp</span>
          </a>

          {/* CALL */}

          <a
            href={`tel:+${phoneNumber}`}
            className="call-button"
          >
            <span className="action-icon">☎</span>
            <span>Call Now</span>
          </a>

          {/* ================= MOBILE MENU ================= */}

          <button
            type="button"
            className={`menu-button ${menuOpen ? "active" : ""}`}
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;