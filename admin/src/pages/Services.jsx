import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  X,
  RefreshCw,
  Wrench,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import "../styles/Services.css";

const API_URL = "http://localhost:8080";

function Services() {
  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("adminToken");

  // ==========================================
  // FETCH SERVICES
  // ==========================================

  const fetchServices = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/services`);

      if (!response.ok) {
        throw new Error("Failed to load services");
      }

      const data = await response.json();

      setServices(data);
    } catch (err) {
      setError(err.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  // ==========================================
  // IMAGE SELECT
  // ==========================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG and WebP images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
    setError("");
  };

  // ==========================================
  // CLEAR FORM
  // ==========================================

  const resetForm = () => {
    setFormData({
      serviceName: "",
      description: "",
    });

    setSelectedImage(null);

    if (
      imagePreview &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(null);
    setEditingId(null);
    setError("");
  };

  // ==========================================
  // CREATE / UPDATE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.serviceName.trim()) {
      setError("Service name is required.");
      return;
    }

    if (!editingId && !selectedImage) {
      setError("Please select a service image.");
      return;
    }

    setSaving(true);

    try {
      const multipartData = new FormData();

      const serviceData = {
        serviceName: formData.serviceName.trim(),
        description: formData.description.trim(),
      };

      multipartData.append(
        "service",
        new Blob(
          [JSON.stringify(serviceData)],
          {
            type: "application/json",
          }
        )
      );

      if (selectedImage) {
        multipartData.append("image", selectedImage);
      }

      const url = editingId
        ? `${API_URL}/api/services/${editingId}`
        : `${API_URL}/api/services`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: multipartData,
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error(
            "Your admin session has expired. Please login again."
          );
        }

        throw new Error(
          editingId
            ? "Failed to update service"
            : "Failed to add service"
        );
      }

      setSuccess(
        editingId
          ? "Service updated successfully."
          : "Service added successfully."
      );

      resetForm();
      await fetchServices();

    } catch (err) {
      setError(
        err.message || "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // EDIT SERVICE
  // ==========================================

  const handleEdit = (service) => {
    setEditingId(service.id);

    setFormData({
      serviceName: service.serviceName || "",
      description: service.description || "",
    });

    setSelectedImage(null);

    if (service.imageUrl) {
      setImagePreview(
        service.imageUrl.startsWith("http")
          ? service.imageUrl
          : `${API_URL}${service.imageUrl}`
      );
    } else {
      setImagePreview(null);
    }

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // DELETE SERVICE
  // ==========================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/api/services/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (
          response.status === 401 ||
          response.status === 403
        ) {
          throw new Error(
            "Your admin session has expired. Please login again."
          );
        }

        throw new Error("Failed to delete service");
      }

      setSuccess("Service deleted successfully.");

      if (editingId === id) {
        resetForm();
      }

      await fetchServices();

    } catch (err) {
      setError(
        err.message || "Failed to delete service"
      );
    }
  };

  // ==========================================
  // IMAGE URL
  // ==========================================

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

  return (
    <AdminLayout title="Services">

      <div className="services-admin-page">

        {/* ================= TOP ================= */}

        <div className="services-page-heading">
          <div>
            <h2>Manage Services</h2>

            <p>
              Add and manage services displayed on the
              Vaishnavi Enterprises website.
            </p>
          </div>

          <button
            type="button"
            className="services-refresh-button"
            onClick={fetchServices}
            disabled={loading}
          >
            <RefreshCw
              size={18}
              className={loading ? "spin" : ""}
            />

            Refresh
          </button>
        </div>

        {/* ================= MESSAGE ================= */}

        {error && (
          <div className="services-message error">
            {error}
          </div>
        )}

        {success && (
          <div className="services-message success">
            {success}
          </div>
        )}

        {/* ================= FORM ================= */}

        <div className="service-form-card">

          <div className="service-form-header">
            <div className="service-form-icon">
              {editingId ? (
                <Pencil size={22} />
              ) : (
                <Plus size={22} />
              )}
            </div>

            <div>
              <h3>
                {editingId
                  ? "Edit Service"
                  : "Add New Service"}
              </h3>

              <p>
                Add service information and upload a
                service photo.
              </p>
            </div>
          </div>

          <form
            className="service-admin-form"
            onSubmit={handleSubmit}
          >

            <div className="service-form-grid">

              {/* LEFT SIDE */}

              <div className="service-fields">

                <div className="service-form-group">
                  <label htmlFor="serviceName">
                    Service Name
                    <span>*</span>
                  </label>

                  <input
                    id="serviceName"
                    name="serviceName"
                    type="text"
                    placeholder="Example: RO Repair"
                    value={formData.serviceName}
                    onChange={handleChange}
                    maxLength={150}
                    required
                  />
                </div>

                <div className="service-form-group">
                  <label htmlFor="description">
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    placeholder="Enter a short description about this service..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    maxLength={2000}
                  />
                </div>

              </div>

              {/* RIGHT SIDE IMAGE */}

              <div className="service-image-section">

                <label className="service-image-label">
                  Service Image
                  {!editingId && <span>*</span>}
                </label>

                <div className="service-image-upload">

                  {imagePreview ? (
                    <div className="service-image-preview">

                      <img
                        src={imagePreview}
                        alt="Service Preview"
                      />

                      <button
                        type="button"
                        className="remove-preview-button"
                        onClick={() => {
                          if (
                            imagePreview.startsWith("blob:")
                          ) {
                            URL.revokeObjectURL(
                              imagePreview
                            );
                          }

                          setImagePreview(null);
                          setSelectedImage(null);
                        }}
                        title="Remove selected image"
                      >
                        <X size={17} />
                      </button>

                    </div>
                  ) : (
                    <div className="service-upload-placeholder">

                      <Upload size={35} />

                      <strong>
                        Upload Service Photo
                      </strong>

                      <span>
                        JPG, PNG or WebP
                      </span>

                      <small>
                        Maximum size: 5MB
                      </small>

                    </div>
                  )}

                  <label className="service-choose-image-button">

                    <Upload size={18} />

                    {imagePreview
                      ? "Change Image"
                      : "Choose Image"}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      hidden
                    />

                  </label>

                </div>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="service-form-actions">

              {editingId && (
                <button
                  type="button"
                  className="service-cancel-button"
                  onClick={resetForm}
                >
                  <X size={18} />
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className="service-save-button"
                disabled={saving}
              >

                {editingId ? (
                  <Pencil size={18} />
                ) : (
                  <Plus size={18} />
                )}

                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Service"
                  : "Add Service"}

              </button>

            </div>

          </form>

        </div>

        {/* ================= SERVICES LIST ================= */}

        <div className="services-list-section">

          <div className="services-list-heading">

            <div>
              <h3>Current Services</h3>

              <p>
                {services.length} service
                {services.length !== 1 ? "s" : ""} available
              </p>
            </div>

          </div>

          {loading ? (
            <div className="services-state">
              <RefreshCw
                size={28}
                className="spin"
              />

              <p>Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="services-state">

              <Wrench size={40} />

              <h3>No Services Added</h3>

              <p>
                Add your first service using the form
                above.
              </p>

            </div>
          ) : (
            <div className="admin-services-grid">

              {services.map((service) => {

                const imageUrl =
                  getImageUrl(service.imageUrl);

                return (
                  <div
                    className="admin-service-card"
                    key={service.id}
                  >

                    <div className="admin-service-image">

                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={service.serviceName}
                        />
                      ) : (
                        <div className="service-no-image">
                          <Wrench size={34} />
                          <span>No Image</span>
                        </div>
                      )}

                    </div>

                    <div className="admin-service-content">

                      <h3>
                        {service.serviceName}
                      </h3>

                      <p>
                        {service.description ||
                          "No description added."}
                      </p>

                      <div className="admin-service-actions">

                        <button
                          type="button"
                          className="service-edit-button"
                          onClick={() =>
                            handleEdit(service)
                          }
                        >
                          <Pencil size={17} />
                          Edit
                        </button>

                        <button
                          type="button"
                          className="service-delete-button"
                          onClick={() =>
                            handleDelete(service.id)
                          }
                        >
                          <Trash2 size={17} />
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>

    </AdminLayout>
  );
}

export default Services;