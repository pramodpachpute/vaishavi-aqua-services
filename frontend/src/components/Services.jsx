import React from "react";
import "./Services.css";

const services = [
  {
    number: "01",
    icon: "🏭",
    title: "RO Sales & Service",
    description:
      "Complete RO water purifier sales and professional service for all types of water purification systems.",
  },
  {
    number: "02",
    icon: "💧",
    title: "RO + UV + UF Installation",
    description:
      "Professional installation of all brands RO, UV and UF water filter systems.",
  },
  {
    number: "03",
    icon: "🛠",
    title: "RO Service & Repair",
    description:
      "Expert RO servicing and repair to keep your water purifier working efficiently.",
  },
  {
    number: "04",
    icon: "▥",
    title: "Filter Replacement",
    description:
      "Timely filter and essential parts replacement for clean, safe and pure drinking water.",
  },
  {
    number: "05",
    icon: "⚙",
    title: "Water Purifier Repair",
    description:
      "Professional repair service for RO, UV, UF water purifiers and all major brands.",
  },
  {
    number: "06",
    icon: "◉",
    title: "AMC Service",
    description:
      "Annual maintenance service to keep your water purifier reliable and performing efficiently.",
  },
];

const Services = () => {
  const phoneNumber = "919405439494";

  return (
    <section className="services" id="services">
      <div className="services-container">

        {/* =========================
            MAIN HEADING
        ========================== */}

        <div className="services-heading">
          <div className="services-badge">
            <span>💧</span>
            OUR SERVICES
          </div>

          <h2>
            Complete Care for Your
            <br />
            <span>Water Purifier.</span>
          </h2>

          <p>
            Professional installation, repair and maintenance services at your
            doorstep.
          </p>

          <div className="services-wave">〰</div>
        </div>

        {/* =========================
            SERVICE CATEGORY HEADING
        ========================== */}

        <div className="services-category">
          <span>COMPLETE SOLUTIONS FOR</span>

          <h3>
            Industrial, Domestic & Commercial
          </h3>
        </div>

        {/* =========================
            SERVICE CARDS
        ========================== */}

        <div className="services-grid">
          {services.map((service) => (
            <article
              className="service-card"
              key={service.number}
            >
              {/* NUMBER */}

              <span className="service-number">
                {service.number}
              </span>

              {/* ICON */}

              <div className="service-icon-box">
                <span>{service.icon}</span>
              </div>

              {/* CONTENT */}

              <div className="service-card-content">
                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>
              </div>

              {/* WHATSAPP ENQUIRY */}

              <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                  `Hi Vaishnavi Enterprises, I need information about ${service.title}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="service-arrow"
                aria-label={`Enquire about ${service.title}`}
              >
                →
              </a>
            </article>
          ))}
        </div>

        {/* =========================
            HELP BANNER
        ========================== */}

        <div className="services-support">

          <div className="support-decoration"></div>

          {/* LEFT SIDE */}

          <div className="support-left">

            <div className="support-icon">
              🎧
            </div>

            <div>
              <h3>
                Need Help with Your Purifier?
              </h3>

              <p>
                Our experts are ready to assist you.
              </p>
            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="support-actions">

            {/* WHATSAPP */}

            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                "Hi Vaishnavi Enterprises, I need help with my water purifier."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="support-whatsapp"
            >
              <span className="whatsapp-circle">
                ●
              </span>

              WhatsApp Us
            </a>

            {/* CALL */}

            <a
              href={`tel:+${phoneNumber}`}
              className="support-call"
            >
              <span>☎</span>
              Call Now
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Services;