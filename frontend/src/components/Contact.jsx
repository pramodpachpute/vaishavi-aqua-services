import React from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  ArrowUpRight,
  Check,
  Droplets,
  Clock3,
} from "lucide-react";

import "./Contact.css";

const Contact = () => {
  const phoneNumber = "919405439494";

  const whatsappMessage =
    "Hi Vaishnavi Enterprises, I need information about your water purifier sales and services.";

  // Exact Google Maps directions link
  const mapUrl =
    "https://www.google.com/maps/dir//Vaishnavi+Aqua+technology,+Venkatesh+Imperia,+Pandhare+Wasti,+Kate+Wasti,+Punawale,+Pimpri-Chinchwad,+Maharashtra+411033/@18.6208536,73.7124787,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bc2bb8ac6e5f61d:0xb8c3b0204e83b1b1!2m2!1d73.7387731!2d18.6282582?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">

        {/* ================================
            SECTION HEADING
        ================================= */}

        <div className="contact-heading">
          <div className="contact-tag">
            <span className="contact-tag-dot"></span>
            GET IN TOUCH
          </div>

          <h2>
            We’re Here to Help With
            <span> Pure Water.</span>
          </h2>

          <p>
            Need a new purifier, repair or regular maintenance?
            Connect with Vaishnavi Enterprises for quick and
            reliable assistance.
          </p>
        </div>

        {/* ================================
            MAIN CONTACT GRID
        ================================= */}

        <div className="contact-premium-grid">

          {/* ================================
              LEFT PREMIUM CARD
          ================================= */}

          <div className="contact-hero-card">

            {/* Decorative Elements */}
            <div className="contact-hero-decoration contact-circle-one"></div>
            <div className="contact-hero-decoration contact-circle-two"></div>

            <div className="contact-hero-content">

              {/* Business Badge */}

              <div className="contact-brand-badge">
                <Droplets size={15} />
                VAISHNAVI ENTERPRISES
              </div>

              {/* Main Message */}

              <h3>
                Clean water starts with
                <span> the right care.</span>
              </h3>

              <p className="contact-hero-description">
                From purifier sales to installation, repair,
                filter replacement and AMC — our team is ready
                to help you keep your drinking water pure and safe.
              </p>

              {/* Services */}

              <div className="contact-service-points">

                <div>
                  <span>
                    <Check size={13} />
                  </span>
                  RO, UV & UF Purifiers
                </div>

                <div>
                  <span>
                    <Check size={13} />
                  </span>
                  Installation & Repair
                </div>

                <div>
                  <span>
                    <Check size={13} />
                  </span>
                  Filter Replacement
                </div>

                <div>
                  <span>
                    <Check size={13} />
                  </span>
                  AMC & Maintenance
                </div>

              </div>

              {/* Action Buttons */}

              <div className="contact-hero-actions">

                {/* Call */}

                <a
                  href={`tel:+${phoneNumber}`}
                  className="contact-call-button"
                >
                  <Phone size={17} />

                  <div>
                    <small>CALL US NOW</small>
                    <strong>+91 94054 39494</strong>
                  </div>
                </a>

                {/* WhatsApp */}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-whatsapp-button"
                >
                  <MessageCircle size={18} />

                  <span>WhatsApp</span>

                  <ArrowUpRight size={16} />
                </a>

              </div>

            </div>
          </div>

          {/* ================================
              RIGHT INFORMATION SIDE
          ================================= */}

          <div className="contact-info-side">

            {/* CALL CARD */}

            <a
              href={`tel:+${phoneNumber}`}
              className="contact-info-card"
            >
              <div className="contact-info-icon phone-icon">
                <Phone size={21} />
              </div>

              <div className="contact-info-text">
                <span>CALL US</span>

                <h4>+91 94054 39494</h4>

                <p>
                  Talk directly with our team for purifier
                  sales, service or repair enquiries.
                </p>
              </div>

              <div className="contact-arrow">
                <ArrowUpRight size={18} />
              </div>
            </a>

            {/* WHATSAPP CARD */}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="contact-info-card"
            >
              <div className="contact-info-icon whatsapp-icon">
                <MessageCircle size={21} />
              </div>

              <div className="contact-info-text">
                <span>WHATSAPP</span>

                <h4>Chat With Our Team</h4>

                <p>
                  Send your purifier requirement and get
                  quick assistance from our team.
                </p>
              </div>

              <div className="contact-arrow">
                <ArrowUpRight size={18} />
              </div>
            </a>

            {/* LOCATION CARD */}

            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="contact-info-card contact-location-card"
            >
              <div className="contact-info-icon location-icon">
                <MapPin size={21} />
              </div>

              <div className="contact-info-text">
                <span>VISIT US</span>

                <h4>Vaishnavi Aqua Technology</h4>

                <p>
                  Venkatesh Imperia, Pandhare Wasti,
                  Kate Wasti, Punawale, Pimpri-Chinchwad,
                  Maharashtra – 411033
                </p>

                <div className="contact-map-link">
                  Get Directions
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </a>

            {/* SUPPORT CARD */}

            <div className="contact-hours-card">

              <div className="contact-hours-icon">
                <Clock3 size={19} />
              </div>

              <div className="contact-hours-content">
                <span>QUICK SUPPORT</span>

                <strong>
                  Sales & Service Assistance
                </strong>
              </div>

              <div className="contact-online-status">
                <span></span>
                Available
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;