import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Package,
  RefreshCw,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

import AdminLayout from "../components/AdminLayout";
import "../styles/Products.css";

const API_URL = "http://localhost:8080";

const EMPTY_PRODUCT = {
  productName: "",
  brand: "",
  description: "",
  features: "",
};

function Products() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(EMPTY_PRODUCT);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  // ==========================================
  // BUILD PRODUCT IMAGE URL
  // ==========================================

  const getProductImageUrl = (imageUrl) => {
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

  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/products`
      );

      if (!response.ok) {
        throw new Error("Unable to load products.");
      }

      const data = await response.json();

      const sortedProducts = [...data].sort(
        (a, b) => (b.id || 0) - (a.id || 0)
      );

      setProducts(sortedProducts);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // IMAGE SELECTION
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
      setError(
        "Please select a JPG, PNG or WebP image."
      );

      e.target.value = "";
      return;
    }

    // Maximum 5 MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Image size must be less than 5 MB."
      );

      e.target.value = "";
      return;
    }

    setError("");
    setSelectedImage(file);

    // Local preview only
    const previewUrl = URL.createObjectURL(file);

    setImagePreview((oldPreview) => {
      if (oldPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(oldPreview);
      }

      return previewUrl;
    });
  };

  // ==========================================
  // OPEN ADD FORM
  // ==========================================

  const openAddForm = () => {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setEditingId(null);
    setFormData(EMPTY_PRODUCT);
    setSelectedImage(null);
    setImagePreview("");

    setError("");
    setMessage("");

    setShowForm(true);
  };

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

  const openEditForm = (product) => {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setEditingId(product.id);

    setFormData({
      productName: product.productName || "",
      brand: product.brand || "",
      description: product.description || "",
      features: product.features || "",
    });

    setSelectedImage(null);

    setImagePreview(
      getProductImageUrl(product.imageUrl) || ""
    );

    setError("");
    setMessage("");

    setShowForm(true);
  };

  // ==========================================
  // CLOSE FORM
  // ==========================================

  const closeForm = () => {
    if (imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setShowForm(false);
    setEditingId(null);
    setFormData(EMPTY_PRODUCT);

    setSelectedImage(null);
    setImagePreview("");
  };

  // ==========================================
  // CREATE MULTIPART FORM DATA
  // ==========================================

  const buildMultipartData = () => {
    const multipartData = new FormData();

    const productData = {
      productName: formData.productName.trim(),
      brand: formData.brand.trim(),
      description: formData.description.trim(),
      features: formData.features.trim(),
    };

    // IMPORTANT:
    // Spring @RequestPart("product") expects JSON.
    const productBlob = new Blob(
      [JSON.stringify(productData)],
      {
        type: "application/json",
      }
    );

    multipartData.append(
      "product",
      productBlob
    );

    if (selectedImage) {
      multipartData.append(
        "image",
        selectedImage
      );
    }

    return multipartData;
  };

  // ==========================================
  // ADD / UPDATE PRODUCT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productName.trim()) {
      setError("Product name is required.");
      return;
    }

    // Image required only when adding
    if (!editingId && !selectedImage) {
      setError(
        "Please select a product image."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const isEditing = editingId !== null;

      const url = isEditing
        ? `${API_URL}/api/products/${editingId}`
        : `${API_URL}/api/products`;

      const multipartData =
        buildMultipartData();

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: multipartData,
      });

      // DO NOT manually set Content-Type.
      // Browser automatically adds multipart boundary.

      if (!response.ok) {
        let errorMessage = isEditing
          ? "Unable to update product."
          : "Unable to add product.";

        try {
          const errorData =
            await response.json();

          if (errorData.message) {
            errorMessage =
              errorData.message;
          }
        } catch {
          // Ignore non-JSON error response
        }

        throw new Error(errorMessage);
      }

      const savedProduct =
        await response.json();

      if (isEditing) {
        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === editingId
              ? savedProduct
              : product
          )
        );

        setMessage(
          "Product updated successfully."
        );
      } else {
        setProducts((currentProducts) => [
          savedProduct,
          ...currentProducts,
        ]);

        setMessage(
          "Product added successfully."
        );
      }

      closeForm();
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Product operation failed."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const deleteProduct = async (
    productId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(productId);
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/api/products/${productId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to delete product."
        );
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) =>
            product.id !== productId
        )
      );

      setMessage(
        "Product deleted successfully."
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

  return (
    <AdminLayout title="Products">

      {/* HEADER */}

      <div className="products-heading">
        <div>
          <h2>Product Management</h2>

          <p>
            Add, edit and manage water
            purifier products.
          </p>
        </div>

        <div className="product-header-actions">

          <button
            className="product-refresh-button"
            onClick={fetchProducts}
            disabled={loading}
          >
            <RefreshCw
              size={17}
              className={
                loading ? "spin" : ""
              }
            />

            Refresh
          </button>

          <button
            className="add-product-button"
            onClick={openAddForm}
          >
            <Plus size={18} />
            Add Product
          </button>

        </div>
      </div>

      {/* SUCCESS MESSAGE */}

      {message && (
        <div className="product-alert success">
          {message}
        </div>
      )}

      {/* ERROR MESSAGE */}

      {error && !showForm && (
        <div className="product-alert error">
          {error}
        </div>
      )}

      {/* PRODUCTS */}

      {loading ? (
        <div className="products-state">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="products-state">

          <Package size={40} />

          <h3>No Products</h3>

          <p>
            Add your first water purifier
            product.
          </p>

        </div>
      ) : (
        <div className="products-grid">

          {products.map((product) => (

            <div
              className="product-admin-card"
              key={product.id}
            >

              <div className="product-image-area">

                {product.imageUrl ? (
                  <img
                    src={getProductImageUrl(
                      product.imageUrl
                    )}
                    alt={product.productName}
                    loading="lazy"
                  />
                ) : (
                  <div className="product-no-image">
                    <Package size={40} />
                    <span>No Image</span>
                  </div>
                )}

              </div>

              <div className="product-card-content">

                <span className="product-brand">
                  {product.brand ||
                    "Water Purifier"}
                </span>

                <h3>
                  {product.productName}
                </h3>

                <p className="product-description">
                  {product.description ||
                    "No description available."}
                </p>

                {product.features && (
                  <div className="product-features">

                    {product.features
                      .split(",")
                      .slice(0, 4)
                      .map(
                        (
                          feature,
                          index
                        ) => (
                          <span key={index}>
                            {feature.trim()}
                          </span>
                        )
                      )}

                  </div>
                )}

                <div className="product-card-actions">

                  <button
                    className="edit-product-button"
                    onClick={() =>
                      openEditForm(product)
                    }
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    className="delete-product-button"
                    onClick={() =>
                      deleteProduct(product.id)
                    }
                    disabled={
                      deletingId ===
                      product.id
                    }
                  >
                    <Trash2 size={16} />

                    {deletingId ===
                    product.id
                      ? "Deleting..."
                      : "Delete"}

                  </button>

                </div>
              </div>
            </div>

          ))}

        </div>
      )}

      {/* ADD / EDIT MODAL */}

      {showForm && (

        <div
          className="product-modal-overlay"
          onMouseDown={closeForm}
        >

          <div
            className="product-modal"
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            <div className="product-modal-header">

              <div>
                <h3>
                  {editingId
                    ? "Edit Product"
                    : "Add New Product"}
                </h3>

                <p>
                  Enter product details and
                  select an image.
                </p>
              </div>

              <button
                className="product-modal-close"
                onClick={closeForm}
                type="button"
              >
                <X size={21} />
              </button>

            </div>

            <form
              className="product-form"
              onSubmit={handleSubmit}
            >

              {/* PRODUCT + BRAND */}

              <div className="product-form-row">

                <div className="product-form-group">

                  <label>
                    Product Name *
                  </label>

                  <input
                    type="text"
                    name="productName"
                    value={
                      formData.productName
                    }
                    onChange={handleChange}
                    placeholder="Example: Aqua Grand RO"
                    required
                  />

                </div>

                <div className="product-form-group">

                  <label>Brand</label>

                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Example: Aqua Grand"
                  />

                </div>

              </div>

              {/* DESCRIPTION */}

              <div className="product-form-group">

                <label>Description</label>

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={handleChange}
                  placeholder="Enter product description..."
                  rows="4"
                />

              </div>

              {/* FEATURES */}

              <div className="product-form-group">

                <label>Features</label>

                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="RO, UV, UF, TDS Controller"
                />

                <small>
                  Separate multiple features
                  using commas.
                </small>

              </div>

              {/* DIRECT IMAGE UPLOAD */}

              <div className="product-form-group">

                <label>
                  Product Image{" "}
                  {!editingId && "*"}
                </label>

                <label className="product-image-upload">

                  <Upload size={23} />

                  <div>
                    <strong>
                      {selectedImage
                        ? selectedImage.name
                        : "Choose Product Image"}
                    </strong>

                    <span>
                      JPG, PNG or WebP — Max
                      5 MB
                    </span>
                  </div>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={
                      handleImageChange
                    }
                  />

                </label>

                {editingId && (
                  <small>
                    Leave image unchanged if
                    you want to keep the
                    existing product image.
                  </small>
                )}

              </div>

              {/* IMAGE PREVIEW */}

              {imagePreview ? (
                <div className="product-image-preview">

                  <span>
                    Image Preview
                  </span>

                  <div className="preview-image-box">

                    <img
                      src={imagePreview}
                      alt="Product preview"
                    />

                  </div>

                </div>
              ) : (
                <div className="product-image-empty-preview">

                  <ImageIcon size={28} />

                  <span>
                    No image selected
                  </span>

                </div>
              )}

              {/* MODAL ERROR */}

              {error && (
                <div className="product-alert error">
                  {error}
                </div>
              )}

              {/* BUTTONS */}

              <div className="product-form-actions">

                <button
                  type="button"
                  className="cancel-product-button"
                  onClick={closeForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-product-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Product"
                    : "Add Product"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </AdminLayout>
  );
}

export default Products;