import { useEffect, useState } from "react";
import {
  CalendarCheck,
  Clock3,
  Package,
  Star,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import "../styles/Dashboard.css";

const API_URL = "http://localhost:8080";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("adminToken");

        // BOOKINGS - JWT REQUIRED
        const bookingsResponse = await fetch(
          `${API_URL}/api/bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // PRODUCTS - PUBLIC
        const productsResponse = await fetch(
          `${API_URL}/api/products`
        );

        // REVIEWS - PUBLIC
        const reviewsResponse = await fetch(
          `${API_URL}/api/reviews`
        );

        if (!bookingsResponse.ok) {
          throw new Error("Unable to load bookings.");
        }

        if (!productsResponse.ok) {
          throw new Error("Unable to load products.");
        }

        if (!reviewsResponse.ok) {
          throw new Error("Unable to load reviews.");
        }

        const bookingsData = await bookingsResponse.json();
        const productsData = await productsResponse.json();
        const reviewsData = await reviewsResponse.json();

        setBookings(bookingsData);
        setProducts(productsData);
        setReviews(reviewsData);
      } catch (err) {
        console.error(err);
        setError(err.message || "Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "PENDING"
  ).length;

  const recentBookings = [...bookings]
    .sort((a, b) => (b.id || 0) - (a.id || 0))
    .slice(0, 5);

  return (
    <AdminLayout title="Dashboard">

      <div className="dashboard-welcome">
        <h2>Business Overview</h2>
        <p>
          Monitor your bookings, products and customer reviews.
        </p>
      </div>

      {/* STATISTICS */}

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-info">
            <span>Total Bookings</span>
            <h3>{loading ? "..." : bookings.length}</h3>
          </div>

          <div className="stat-icon">
            <CalendarCheck size={23} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span>Pending Bookings</span>
            <h3>{loading ? "..." : pendingBookings}</h3>
          </div>

          <div className="stat-icon">
            <Clock3 size={23} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span>Total Products</span>
            <h3>{loading ? "..." : products.length}</h3>
          </div>

          <div className="stat-icon">
            <Package size={23} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span>Total Reviews</span>
            <h3>{loading ? "..." : reviews.length}</h3>
          </div>

          <div className="stat-icon">
            <Star size={23} />
          </div>
        </div>

      </div>

      {/* ERROR */}

      {error && (
        <div className="dashboard-section">
          <div className="dashboard-empty">
            {error}
          </div>
        </div>
      )}

      {/* RECENT BOOKINGS */}

      {!error && (
        <div className="dashboard-section">

          <div className="section-header">
            <h3>Recent Bookings</h3>
          </div>

          {loading ? (
            <div className="dashboard-loading">
              Loading dashboard...
            </div>
          ) : recentBookings.length === 0 ? (
            <div className="dashboard-empty">
              No bookings available.
            </div>
          ) : (
            <div className="table-container">

              <table className="dashboard-table">

                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>

                      <td className="customer-name">
                        {booking.customerName}
                      </td>

                      <td>
                        {booking.phoneNumber}
                      </td>

                      <td>
                        {booking.serviceType}
                      </td>

                      <td>
                        <span className="status-badge">
                          {booking.status}
                        </span>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>
      )}

    </AdminLayout>
  );
}

export default Dashboard;