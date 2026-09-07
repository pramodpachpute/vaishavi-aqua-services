import { useEffect, useState } from "react";
import "./OurServices.css";

const API_URL = "http://localhost:8080";

function OurServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/services`
        );

        if (!response.ok) {
          throw new Error("Failed to load services");
        }

        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error(
          "Error loading services:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return null;
    }

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {
      return imageUrl;
    }

    return `${API_URL}${imageUrl}`;
  };

  if (loading) {
    return (
      <section className="our-work-section">
        <div className="our-work-container">
          <p className="our-work-loading">
            Loading our work...
          </p>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <section
      id="our-work"
      className="our-work-section"
    >
      <div className="our-work-container">

        {/* HEADING */}

        <div className="our-work-heading">

          <span>
            OUR WORK
          </span>

          <h2>
            Our Completed Service Work
          </h2>

          <p>
            Take a look at some of the water
            purifier service work completed by
            Vaishnavi Enterprises.
          </p>

        </div>

        {/* WORK CARDS */}

        <div className="our-work-grid">

          {services.map((service) => {
            const imageUrl = getImageUrl(
              service.imageUrl
            );

            return (
              <article
                className="our-work-card"
                key={service.id}
              >

                {/* PHOTO */}

                <div className="our-work-image">

                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={service.serviceName}
                      loading="lazy"
                    />
                  ) : (
                    <div className="our-work-no-image">
                      No Photo Available
                    </div>
                  )}

                </div>

                {/* DETAILS BELOW PHOTO */}

                <div className="our-work-content">

                  <h3>
                    {service.serviceName}
                  </h3>

                  <p>
                    {service.description ||
                      "Professional water purifier service completed by Vaishnavi Enterprises."}
                  </p>

                </div>

              </article>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default OurServices;