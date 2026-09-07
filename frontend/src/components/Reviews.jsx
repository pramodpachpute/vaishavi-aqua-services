import React, { useEffect, useState } from "react";
import {
  Star,
  PenLine,
  Send,
  Quote,
  UserRound,
} from "lucide-react";
import "./Reviews.css";

const API_URL = "http://localhost:8080";

const services = [
  "RO Service",
  "RO Repair",
  "RO Installation",
  "Filter Replacement",
  "AMC Service",
  "Domestic RO",
  "Industrial RO",
  "Water Purifier Sales",
];

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /* =========================================
     GET REVIEWS
  ========================================= */

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/reviews`
      );

      if (!response.ok) {
        throw new Error("Failed to load reviews");
      }

      const data = await response.json();

      const sortedReviews = [...data].sort(
        (a, b) => b.id - a.id
      );

      setReviews(sortedReviews);
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  /* =========================================
     SUBMIT REVIEW
  ========================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !service ||
      !reviewText.trim()
    ) {
      setMessage(
        "Please complete all fields before submitting."
      );
      return;
    }

    const reviewData = {
      customerName: name.trim(),
      serviceName: service,
      rating,
      reviewText: reviewText.trim(),
    };

    try {
      setSubmitting(true);
      setMessage("");

      const response = await fetch(
        `${API_URL}/api/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const savedReview = await response.json();

      setReviews((previousReviews) => [
        savedReview,
        ...previousReviews,
      ]);

      setName("");
      setService("");
      setRating(5);
      setHoverRating(0);
      setReviewText("");

      setMessage(
        "Thank you! Your review has been submitted."
      );

      setTimeout(() => {
        setMessage("");
      }, 3500);
    } catch (error) {
      console.error("Error submitting review:", error);

      setMessage(
        "Unable to submit your review. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="reviews-section"
      id="reviews"
    >
      <div className="reviews-container">

        {/* HEADING */}

        <div className="reviews-heading">
          <div className="reviews-tag">
            <Star size={13} fill="currentColor" />
            CUSTOMER REVIEWS
          </div>

          <h2>
            Trusted by Our
            <span> Customers.</span>
          </h2>

          <p>
            See what our customers say about
            Vaishnavi Enterprises water purifier
            sales and services.
          </p>
        </div>

        {/* MAIN LAYOUT */}

        <div className="reviews-layout">

          {/* LEFT REVIEWS */}

          <div className="reviews-list-area">

            <div className="reviews-list-header">
              <div>
                <span className="small-label">
                  REAL CUSTOMER FEEDBACK
                </span>

                <h3>
                  Reviews From Our Customers
                </h3>
              </div>

              <div className="review-count">
                <strong>{reviews.length}</strong>
                <span>Reviews</span>
              </div>
            </div>

            <div className="reviews-grid">

              {loading ? (
                <div className="no-reviews">
                  Loading customer reviews...
                </div>
              ) : reviews.length === 0 ? (
                <div className="no-reviews">
                  <UserRound size={22} />

                  <span>
                    No reviews yet. Be the first
                    customer to share your experience.
                  </span>
                </div>
              ) : (
                reviews
                  .slice(0, 6)
                  .map((item) => (
                    <article
                      className="review-card"
                      key={item.id}
                    >
                      {/* TOP */}

                      <div className="review-card-top">

                        <div className="review-customer">

                          <div className="review-avatar">
                            {item.customerName
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="review-user">
                            <strong>
                              {item.customerName}
                            </strong>

                            <span>
                              {item.serviceName}
                            </span>
                          </div>

                        </div>

                        <Quote
                          className="review-quote-icon"
                          size={20}
                        />

                      </div>

                      {/* STARS */}

                      <div className="review-stars">
                        {[1, 2, 3, 4, 5].map(
                          (star) => (
                            <Star
                              key={star}
                              size={13}
                              className={
                                star <= item.rating
                                  ? "review-star-filled"
                                  : "review-star-empty"
                              }
                              fill={
                                star <= item.rating
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          )
                        )}

                        <span className="review-rating-number">
                          {item.rating}.0
                        </span>
                      </div>

                      {/* REVIEW TEXT */}

                      <p className="review-text">
                        “{item.reviewText}”
                      </p>

                    </article>
                  ))
              )}

            </div>
          </div>

          {/* RIGHT FORM */}

          <div className="review-form-card">

            <div className="review-form-heading">

              <div className="form-icon">
                <PenLine size={18} />
              </div>

              <div>
                <span className="small-label">
                  YOUR FEEDBACK
                </span>

                <h3>Write a Review</h3>

                <p>
                  Share your service experience.
                </p>
              </div>

            </div>

            <form
              className="review-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}

              <div className="form-group">
                <label htmlFor="review-name">
                  Your Name
                </label>

                <input
                  id="review-name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  disabled={submitting}
                />
              </div>

              {/* SERVICE */}

              <div className="form-group">
                <label htmlFor="review-service">
                  Service
                </label>

                <select
                  id="review-service"
                  value={service}
                  onChange={(e) =>
                    setService(e.target.value)
                  }
                  disabled={submitting}
                >
                  <option value="">
                    Select service
                  </option>

                  {services.map((item) => (
                    <option
                      value={item}
                      key={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* RATING */}

              <div className="form-group">
                <label>Your Rating</label>

                <div
                  className="rating-selector"
                  onMouseLeave={() =>
                    setHoverRating(0)
                  }
                >
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <button
                        type="button"
                        key={star}
                        className={
                          star <=
                          (hoverRating || rating)
                            ? "rating-star active"
                            : "rating-star"
                        }
                        onClick={() =>
                          setRating(star)
                        }
                        onMouseEnter={() =>
                          setHoverRating(star)
                        }
                        aria-label={`${star} star rating`}
                        disabled={submitting}
                      >
                        <Star
                          size={23}
                          fill={
                            star <=
                            (hoverRating || rating)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    )
                  )}
                </div>

                <span className="selected-rating-text">
                  {rating} out of 5 stars
                </span>
              </div>

              {/* REVIEW */}

              <div className="form-group">
                <label htmlFor="review-text">
                  Your Review
                </label>

                <div className="review-textarea-wrapper">
                  <textarea
                    id="review-text"
                    rows="4"
                    maxLength="300"
                    placeholder="Tell us about your service experience..."
                    value={reviewText}
                    onChange={(e) =>
                      setReviewText(e.target.value)
                    }
                    disabled={submitting}
                  />

                  <div className="review-character-count">
                    {reviewText.length}/300
                  </div>
                </div>
              </div>

              {/* MESSAGE */}

              {message && (
                <div
                  className={`review-message ${
                    message.includes("Thank")
                      ? "success"
                      : "error"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* SUBMIT */}

              <button
                type="submit"
                className="submit-review-button"
                disabled={submitting}
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Review"}

                {!submitting && (
                  <Send size={14} />
                )}
              </button>

            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;