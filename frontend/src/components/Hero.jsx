import React from "react";
import "./Hero.css";
import heroImage from "../assets/hero.png";

const Hero = () => {
  return (
    <section className="hero" id="home">
      {/* Decorative background */}
      <div className="hero-circle hero-circle-one"></div>
      <div className="hero-circle hero-circle-two"></div>

      <div className="hero-container">

        {/* =========================
            LEFT SIDE
        ========================== */}
        <div className="hero-content">

          <div className="hero-badge">
            <span className="badge-drop">💧</span>
            <span>Trusted Water Purifier Service</span>
          </div>

          <h1>
            Pure Water.
            <br />
            <span>Better Living.</span>
          </h1>

          <p className="hero-description">
            Professional RO water purifier repair, installation and maintenance
            services delivered to your doorstep by experienced technicians.
          </p>

          {/* Buttons */}
          <div className="hero-buttons">

            <a
              href="https://wa.me/919405439494"
              target="_blank"
              rel="noreferrer"
              className="hero-primary-btn"
            >
              <span className="whatsapp-icon">●</span>
              WhatsApp Us
              <span className="button-arrow">→</span>
            </a>

            <a
              href="tel:+919999999999"
              className="hero-secondary-btn"
            >
              <span className="call-symbol">☎</span>
              Call Now
            </a>

          </div>

          {/* Stats */}
          <div className="hero-stats">

            <div className="hero-stat">
              <div className="stat-icon">👥</div>

              <div className="stat-details">
                <strong>500+</strong>
                <span>Happy Customers</span>
              </div>
            </div>

            <div className="stat-divider"></div>

            <div className="hero-stat">
              <div className="stat-icon">☆</div>

              <div className="stat-details">
                <strong>4.9 ★</strong>
                <span>Customer Rating</span>
              </div>
            </div>

            <div className="stat-divider"></div>

            <div className="hero-stat">
              <div className="stat-icon">🎧</div>

              <div className="stat-details">
                <strong>24/7</strong>
                <span>Service Support</span>
              </div>
            </div>

          </div>

        </div>

        {/* =========================
            RIGHT SIDE
        ========================== */}
        <div className="hero-visual">

          {/* Water bubbles */}
          <span className="water-bubble bubble-one"></span>
          <span className="water-bubble bubble-two"></span>
          <span className="water-bubble bubble-three"></span>
          <span className="water-bubble bubble-four"></span>

          <div className="hero-product-card">

            <div className="product-content">

              <div className="product-drop">
                💧
              </div>

              <span className="product-brand">
                VAISHAVI AQUA SERVICES
              </span>

              <h2>
                Clean Water Starts
                <br />
                With Better Care.
              </h2>

              <p>
                Reliable service for RO, UV and all major water purifier
                systems.
              </p>

              <div className="product-line"></div>

              <div className="product-features">

                <div>
                  <span className="check-icon">✓</span>
                  <strong>Expert Technician</strong>
                </div>

                <div>
                  <span className="check-icon">✓</span>
                  <strong>Genuine Parts</strong>
                </div>

                <div>
                  <span className="check-icon">✓</span>
                  <strong>Doorstep Service</strong>
                </div>

              </div>

            </div>

            {/* RO PURIFIER */}
            <div className="purifier-area">

              <div className="purifier-glow"></div>

              <img
                src={heroImage}
                alt="RO Water Purifier"
                className="purifier-image"
              />

              <span className="leaf leaf-one">🍃</span>
              <span className="leaf leaf-two">🍃</span>

            </div>

            {/* Fake water splash */}
            <div className="water-splash">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;