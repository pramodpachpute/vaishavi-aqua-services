import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Package,
  Wrench,
  Star,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";
import "../styles/AdminLayout.css";

function AdminLayout({ children, title = "Dashboard" }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminUser = JSON.parse(
    localStorage.getItem("adminUser") || "{}"
  );

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    navigate("/login");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">

      {/* ================= MOBILE OVERLAY ================= */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >

        {/* BRAND */}

        <div className="sidebar-brand">

          <div className="admin-brand-logo-wrapper">
            <img
              src="/images/logo.png"
              alt="Vaishnavi Enterprises Logo"
              className="admin-brand-logo"
            />
          </div>

          <div className="brand-text">
            <h2>Vaishnavi</h2>
            <span>Enterprises</span>
          </div>

          <button
            type="button"
            className="sidebar-close"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>

        </div>

        {/* MENU LABEL */}

        <div className="sidebar-label">
          MANAGEMENT
        </div>

        {/* NAVIGATION */}

        <nav className="sidebar-nav">

          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/bookings"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <CalendarCheck size={20} />
            <span>Bookings</span>
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <Package size={20} />
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/services"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <Wrench size={20} />
            <span>Services</span>
          </NavLink>

          <NavLink
            to="/reviews"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <Star size={20} />
            <span>Reviews</span>
          </NavLink>

        </nav>

        {/* LOGOUT */}

        <div className="sidebar-bottom">
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* ================= MAIN AREA ================= */}

      <main className="admin-main">

        {/* HEADER */}

        <header className="admin-header">

          <div className="header-left">

            <button
              type="button"
              className="mobile-menu"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={23} />
            </button>

            <div>
              <h1>{title}</h1>
              <p>Manage Vaishnavi Enterprises</p>
            </div>

          </div>

          {/* ADMIN PROFILE */}

          <div className="admin-profile">

            <div className="profile-avatar">
              {adminUser.fullName
                ? adminUser.fullName
                    .charAt(0)
                    .toUpperCase()
                : "A"}
            </div>

            <div className="profile-info">

              <strong>
                {adminUser.fullName ||
                  "Administrator"}
              </strong>

              <span>
                {adminUser.email || "Admin"}
              </span>

            </div>

          </div>

        </header>

        {/* ================= PAGE CONTENT ================= */}

        <div className="admin-content">
          {children}
        </div>

      </main>

    </div>
  );
}

export default AdminLayout;