import React, { useState } from "react";
import "./Booking.css";

const services = [
  "RO Repair",
  "RO Installation",
  "RO Service",
  "Filter Replacement",
  "AMC Service",
  "Domestic RO System",
  "Industrial RO System",
  "New Water Purifier",
];

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    address: "",
    problem: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.service ||
      !formData.address.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const bookingData = {
      customerName: formData.name.trim(),
      phoneNumber: formData.phone.trim(),
      serviceType: formData.service,
      address: formData.address.trim(),
      problemDescription:
        formData.problem.trim() || "Not provided",
    };

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit booking.");
      }

      const savedBooking = await response.json();

      console.log("Booking saved:", savedBooking);

      setSuccess(
        "Your service request has been submitted successfully."
      );

      setFormData({
        name: "",
        phone: "",
        service: "",
        address: "",
        problem: "",
      });
    } catch (err) {
      console.error(err);

      setError(
        "Unable to submit your booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="booking-section" id="booking">
      <div className="booking-container">

        <div className="booking-info">
          <div className="booking-tag">
            <span>💧</span>
            BOOK A SERVICE
          </div>

          <h2>
            Need Purifier Service?
            <br />
            <span>Book It in Minutes.</span>
          </h2>

          <p>
            Share your requirement and our team will contact you for service
            assistance.
          </p>

          <div className="booking-points">
            <div>
              <span>✓</span>
              Doorstep Service
            </div>

            <div>
              <span>✓</span>
              RO • UV • UF Support
            </div>

            <div>
              <span>✓</span>
              Domestic & Industrial RO
            </div>
          </div>
        </div>

        <div className="booking-form-card">
          <h3>Service Request</h3>

          <p className="booking-form-subtitle">
            Fill in your details below.
          </p>

          <form onSubmit={handleSubmit} className="booking-form">

            <div className="booking-row">

              <div className="booking-group">
                <label>Your Name *</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="booking-group">
                <label>Mobile Number *</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="booking-group">
              <label>Select Service *</label>

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">
                  Choose a service
                </option>

                {services.map((service) => (
                  <option
                    key={service}
                    value={service}
                  >
                    {service}
                  </option>
                ))}

              </select>
            </div>

            <div className="booking-group">
              <label>Address / Area *</label>

              <input
                type="text"
                name="address"
                placeholder="Enter your area or address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="booking-group">
              <label>Problem / Requirement</label>

              <textarea
                name="problem"
                rows="4"
                placeholder="Example: RO not giving water, filter replacement required..."
                value={formData.problem}
                onChange={handleChange}
              />
            </div>

            {error && (
              <div className="booking-error">
                {error}
              </div>
            )}

            {success && (
              <div className="booking-success">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="booking-submit"
              disabled={loading}
            >
              <span>●</span>

              {loading
                ? "Submitting..."
                : "Book Service"}

              <b>→</b>
            </button>

          </form>
        </div>

      </div>
    </section>
  );
};

export default Booking;