import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      localStorage.setItem("adminToken", data.token);

      localStorage.setItem(
        "adminUser",
        JSON.stringify({
          id: data.id,
          fullName: data.fullName,
          email: data.email,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.message || "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* ================= BRAND ================= */}

        <div className="login-logo">
          <img
            src="/images/logo.png"
            alt="Vaishnavi Enterprises Logo"
            className="login-brand-image"
          />

          <div className="login-brand-text">
            <h1>Vaishnavi Enterprises</h1>
            <p>ADMIN PANEL</p>
          </div>
        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        {/* ================= LOGIN FORM ================= */}

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}

          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <div className="input-box">
              <Mail size={20} />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter admin email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* PASSWORD */}

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <div className="input-box">
              <Lock size={20} />

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {/* SIGN IN BUTTON */}

          <button
            className="login-button"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span>Signing In...</span>
            ) : (
              <>
                <LogIn size={20} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* ================= FOOTER ================= */}

        <div className="login-footer">
          <p>Secure Admin Access</p>
        </div>

      </div>
    </div>
  );
}

export default Login;