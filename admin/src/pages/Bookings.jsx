import { useEffect, useState } from "react";
import {
  RefreshCw,
  Trash2,
  Phone,
  MapPin,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import "../styles/Bookings.css";

const API_URL = "http://localhost:8080";

const STATUS_OPTIONS = [
  "PENDING",
  "CONFIRMED",
  "ASSIGNED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("adminToken");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to load bookings.");
      }

      const data = await response.json();

      const sorted = [...data].sort(
        (a, b) => (b.id || 0) - (a.id || 0)
      );

      setBookings(sorted);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (bookingId, newStatus) => {
    try {
      setUpdatingId(bookingId);
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/api/bookings/${bookingId}/status?status=${newStatus}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to update booking status.");
      }

      const updatedBooking = await response.json();

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === bookingId
            ? updatedBooking
            : booking
        )
      );

      setMessage("Booking status updated successfully.");
    } catch (err) {
      console.error(err);
      setError(err.message || "Status update failed.");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(bookingId);
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to delete booking.");
      }

      setBookings((currentBookings) =>
        currentBookings.filter(
          (booking) => booking.id !== bookingId
        )
      );

      setMessage("Booking deleted successfully.");
    } catch (err) {
      console.error(err);
      setError(err.message || "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout title="Bookings">
      <div className="bookings-heading">
        <div>
          <h2>Booking Management</h2>
          <p>
            View customer requests and manage service status.
          </p>
        </div>

        <button
          className="refresh-button"
          onClick={fetchBookings}
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
        <div className="booking-alert success">
          {message}
        </div>
      )}

      {error && (
        <div className="booking-alert error">
          {error}
        </div>
      )}

      <div className="bookings-card">
        {loading ? (
          <div className="bookings-state">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="bookings-state">
            No bookings available.
          </div>
        ) : (
          <div className="bookings-table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <div className="customer-cell">
                        <strong>
                          {booking.customerName}
                        </strong>

                        <a
                          href={`tel:${booking.phoneNumber}`}
                        >
                          <Phone size={14} />
                          {booking.phoneNumber}
                        </a>
                      </div>
                    </td>

                    <td>
                      <div className="service-cell">
                        <strong>
                          {booking.serviceType}
                        </strong>

                        {booking.problemDescription && (
                          <span>
                            {booking.problemDescription}
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="address-cell">
                        <MapPin size={15} />
                        <span>{booking.address}</span>
                      </div>
                    </td>

                    <td>
                      <select
                        className={`status-select status-${booking.status?.toLowerCase()}`}
                        value={booking.status}
                        disabled={
                          updatingId === booking.id
                        }
                        onChange={(e) =>
                          updateStatus(
                            booking.id,
                            e.target.value
                          )
                        }
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status.replaceAll("_", " ")}
                          </option>
                        ))}
                      </select>

                      {updatingId === booking.id && (
                        <span className="updating-text">
                          Updating...
                        </span>
                      )}
                    </td>

                    <td>
                      <button
                        className="delete-booking-button"
                        onClick={() =>
                          deleteBooking(booking.id)
                        }
                        disabled={
                          deletingId === booking.id
                        }
                        title="Delete booking"
                      >
                        <Trash2 size={17} />

                        {deletingId === booking.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Bookings;