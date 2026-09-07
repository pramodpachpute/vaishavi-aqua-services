import React, { useEffect, useState } from "react";
import "./Products.css";

const API_URL = "http://localhost:8080";

const Products = () => {
  const phoneNumber = "919405439494";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH PRODUCTS FROM SPRING BOOT
  // ==========================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/products`
        );

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (err) {
        console.error("Product fetch error:", err);

        setError(
          "Unable to load products. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ==========================================
  // BUILD IMAGE URL
  // ==========================================

  const getProductImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return null;
    }

    // If backend ever returns complete URL
    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {
      return imageUrl;
    }

    // Backend currently returns:
    // /api/products/{id}/image
    return `${API_URL}${imageUrl}`;
  };

  return (
    <section
      className="products-section"
      id="products"
    >
      <div className="products-container">

        {/* ================= HEADING ================= */}

        <div className="products-heading">
          <div className="products-tag">
            <span>💧</span>
            WATER PURIFIER SALES
          </div>

          <h2>
            Find the Right Purifier
            <br />
            <span>for Your Needs.</span>
          </h2>

          <p>
            Domestic and industrial water purification
            solutions from Vaishnavi Enterprises.
          </p>
        </div>

        {/* ================= LOADING ================= */}

        {loading && (
          <p style={{ textAlign: "center" }}>
            Loading products...
          </p>
        )}

        {/* ================= ERROR ================= */}

        {error && (
          <p
            style={{
              textAlign: "center",
              color: "#dc2626",
            }}
          >
            {error}
          </p>
        )}

        {/* ================= PRODUCT GRID ================= */}

        {!loading && !error && products.length > 0 && (
          <div className="products-grid">

            {products.map((product) => {
              const whatsappMessage =
                `Hi Vaishnavi Enterprises, I want more details about ${product.productName}.`;

              const featureList = product.features
                ? product.features
                    .split(",")
                    .map((feature) => feature.trim())
                    .filter(Boolean)
                : [];

              const productImage =
                getProductImageUrl(product.imageUrl);

              return (
                <article
                  className="product-card"
                  key={product.id}
                >

                  {/* ================= IMAGE ================= */}

                  <div className="product-image-area">

                    <span className="product-category">
                      {product.brand || "WATER PURIFIER"}
                    </span>

                    {productImage ? (
                      <img
                        src={productImage}
                        alt={product.productName}
                        className="product-image"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        style={{
                          height: "220px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#94a3b8",
                        }}
                      >
                        No Image Available
                      </div>
                    )}

                  </div>

                  {/* ================= DETAILS ================= */}

                  <div className="product-details">

                    <h3>
                      {product.productName}
                    </h3>

                    <p>
                      {product.description ||
                        "Product information coming soon."}
                    </p>

                    {/* ================= FEATURES ================= */}

                    {featureList.length > 0 && (
                      <div className="product-features">

                        {featureList.map(
                          (feature, index) => (
                            <div
                              className="product-feature"
                              key={`${product.id}-${index}`}
                            >
                              <span>✓</span>

                              {feature}
                            </div>
                          )
                        )}

                      </div>
                    )}

                    {/* ================= WHATSAPP ================= */}

                    <a
                      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                        whatsappMessage
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="product-enquiry"
                    >
                      <span className="product-whatsapp-icon">
                        ●
                      </span>

                      Enquire on WhatsApp

                      <b>→</b>
                    </a>

                  </div>

                </article>
              );
            })}

          </div>
        )}

        {/* ================= NO PRODUCTS ================= */}

        {!loading &&
          !error &&
          products.length === 0 && (
            <p style={{ textAlign: "center" }}>
              No products available right now.
            </p>
          )}

      </div>
    </section>
  );
};

export default Products;