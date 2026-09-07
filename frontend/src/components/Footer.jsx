import React from "react";
import {
  MapPin,
  ArrowUpRight,
  ArrowUp,
  Phone,
  MessageCircle,
  Droplets,
  Wrench,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

import "./Footer.css";

const Footer = () => {
  const phoneNumber = "919405439494";

  const whatsappMessage =
    "Hi Vaishnavi Enterprises, I need information about your water purifier sales and services.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // Exact Vaishnavi Aqua Technology Google Maps directions link
  const mapUrl =
    "https://www.google.com/maps/dir//Vaishnavi+Aqua+technology,+Venkatesh+Imperia,+Pandhare+Wasti,+Kate+Wasti,+Punawale,+Pimpri-Chinchwad,+Maharashtra+411033/@18.6208536,73.7124787,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bc2bb8ac6e5f61d:0xb8c3b0204e83b1b1!2m2!1d73.7387731!2d18.6282582?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D";

  return (
    <footer className="footer">
      <div className="footer-accent-line"></div>

      <div className="footer-container">

        {/* =========================================
            MAIN FOOTER
        ========================================== */}

        <div className="footer-main">

          {/* BRAND */}

          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <img
                src="/images/logo.png"
                alt="Vaishnavi Enterprises"
              />

              <div>
                <h2>Vaishnavi Enterprises</h2>
                <span>RO • UV • UF WATER PURIFIER</span>
              </div>
            </a>

            <p className="footer-brand-description">
              Complete water purifier sales, installation,
              repair and maintenance services for homes
              and businesses.
            </p>

            <div className="footer-contact-actions">

              <a
                href={`tel:+${phoneNumber}`}
                className="footer-contact-button"
                aria-label="Call Vaishnavi Enterprises"
              >
                <Phone size={16} />

                <div>
                  <span>CALL US</span>
                  <strong>+91 94054 39494</strong>
                </div>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-whatsapp-button"
                aria-label="WhatsApp Vaishnavi Enterprises"
              >
                <MessageCircle size={17} />
              </a>

            </div>
          </div>


          {/* QUICK LINKS */}

          <div className="footer-column">
            <div className="footer-column-title">
              <Droplets size={16} />
              <h3>Quick Links</h3>
            </div>

            <a href="#home">
              <ChevronRight size={13} />
              Home
            </a>

            <a href="#about">
              <ChevronRight size={13} />
              About
            </a>

            <a href="#services">
              <ChevronRight size={13} />
              Services
            </a>

            <a href="#products">
              <ChevronRight size={13} />
              Products
            </a>

            <a href="#reviews">
              <ChevronRight size={13} />
              Reviews
            </a>

            <a href="#contact">
              <ChevronRight size={13} />
              Contact
            </a>
          </div>


          {/* SERVICES */}

          <div className="footer-column">
            <div className="footer-column-title">
              <Wrench size={16} />
              <h3>Our Services</h3>
            </div>

            <a href="#services">
              <ChevronRight size={13} />
              RO Repair
            </a>

            <a href="#services">
              <ChevronRight size={13} />
              RO Installation
            </a>

            <a href="#services">
              <ChevronRight size={13} />
              Filter Replacement
            </a>

            <a href="#services">
              <ChevronRight size={13} />
              AMC Service
            </a>

            <a href="#services">
              <ChevronRight size={13} />
              Industrial RO
            </a>

            <a href="#our-work">
              <ChevronRight size={13} />
              Our Completed Work
            </a>
          </div>


          {/* PRODUCTS */}

          <div className="footer-column">
            <div className="footer-column-title">
              <ShoppingBag size={16} />
              <h3>Products</h3>
            </div>

            <a href="#products">
              <ChevronRight size={13} />
              Domestic RO
            </a>

            <a href="#products">
              <ChevronRight size={13} />
              RO + UV + UF
            </a>

            <a href="#products">
              <ChevronRight size={13} />
              Industrial RO System
            </a>
          </div>

        </div>


        {/* =========================================
            LOCATION
        ========================================== */}

        <div className="footer-location-section">

          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="footer-location-card"
          >
            <div className="footer-location-icon">
              <MapPin size={21} />
            </div>

            <div className="footer-location-content">
              <span>OUR LOCATION</span>

              <h3>Vaishnavi Aqua Technology</h3>

              <p>
                Venkatesh Imperia, Pandhare Wasti, Kate Wasti,
                Punawale, Pimpri-Chinchwad, Maharashtra – 411033
              </p>
            </div>

            <div className="footer-directions">
              <span>Get Directions</span>
              <ArrowUpRight size={16} />
            </div>
          </a>

        </div>


        {/* =========================================
            BOTTOM
        ========================================== */}

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} Vaishnavi Enterprises.
            All Rights Reserved.
          </p>

          <div className="footer-tagline">
            <Droplets size={14} />
            <span>Pure Water, Healthy Life</span>
          </div>

          <a
            href="#home"
            className="footer-top-button"
            aria-label="Back to top"
          >
            <ArrowUp size={17} />
          </a>

        </div>

      </div>
    </footer>
  );
};

export default Footer;