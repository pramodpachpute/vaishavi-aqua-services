import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">

        <div className="about-left">
          <div className="about-tag">
            <span></span>
            ABOUT US
          </div>

          <h2>
            Clean Water Deserves
            <br />
            <span>Expert Care.</span>
          </h2>
        </div>

        <div className="about-right">
          <p>
            Vaishavi Aqua Services provides reliable RO water purifier
            repair, installation and maintenance at your doorstep.
          </p>

          <div className="about-points">
            <div className="about-point">
              <span>✓</span>
              <strong>Expert Service</strong>
            </div>

            <div className="about-point">
              <span>✓</span>
              <strong>Genuine Parts</strong>
            </div>

            <div className="about-point">
              <span>✓</span>
              <strong>Doorstep Support</strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;