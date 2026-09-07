import { useEffect, useState } from "react";
import {
  Star,
  Trash2,
  RefreshCw,
  MessageSquareText,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import "../styles/Reviews.css";

const API_URL = "http://localhost:8080";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/reviews`
      );

      if (!response.ok) {
        throw new Error("Unable to load reviews.");
      }

      const data = await response.json();

      const sortedReviews = [...data].sort(
        (a, b) => (b.id || 0) - (a.id || 0)
      );

      setReviews(sortedReviews);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to load reviews."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const deleteReview = async (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(reviewId);
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to delete review."
        );
      }

      setReviews((currentReviews) =>
        currentReviews.filter(
          (review) => review.id !== reviewId
        )
      );

      setMessage(
        "Review deleted successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Delete failed."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const renderStars = (rating) => {
    const safeRating = Number(rating) || 0;

    return (
      <div className="review-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            fill={
              star <= safeRating
                ? "currentColor"
                : "none"
            }
          />
        ))}

        <span>{safeRating}/5</span>
      </div>
    );
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "Not available";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <AdminLayout title="Reviews">

      <div className="reviews-heading">

        <div>
          <h2>Reviews Management</h2>

          <p>
            View and manage customer feedback.
          </p>
        </div>

        <button
          className="reviews-refresh-button"
          onClick={fetchReviews}
          disabled={loading}
        >
          <RefreshCw
            size={17}
            className={loading ? "spin" : ""}
          />

          Refresh
        </button>

      </div>

      {message && (
        <div className="review-alert success">
          {message}
        </div>
      )}

      {error && (
        <div className="review-alert error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="reviews-state">
          Loading reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="reviews-state">

          <MessageSquareText size={42} />

          <h3>No Reviews</h3>

          <p>
            Customer reviews will appear here.
          </p>

        </div>
      ) : (
        <div className="reviews-grid">

          {reviews.map((review) => (

            <article
              className="review-admin-card"
              key={review.id}
            >

              <div className="review-card-top">

                <div>
                  <h3>
                    {review.customerName ||
                      "Customer"}
                  </h3>

                  <span className="review-service">
                    {review.serviceName ||
                      "Water Purifier Service"}
                  </span>
                </div>

                <button
                  className="review-delete-button"
                  onClick={() =>
                    deleteReview(review.id)
                  }
                  disabled={
                    deletingId === review.id
                  }
                  title="Delete review"
                >
                  <Trash2 size={17} />
                </button>

              </div>

              {renderStars(review.rating)}

              <p className="review-text">
                {review.reviewText ||
                  "No review message."}
              </p>

              <div className="review-footer">
                <span>
                  {formatDate(review.createdAt)}
                </span>

                {deletingId === review.id && (
                  <span className="review-deleting">
                    Deleting...
                  </span>
                )}
              </div>

            </article>

          ))}

        </div>
      )}

    </AdminLayout>
  );
}

export default Reviews;