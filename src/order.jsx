// src/Order.js
import React, { useState } from "react";

function Order({ orders, addToCart, cancelOrder }) {
  const [placedOrders, setPlacedOrders] = useState([]);

  const handleBuyNow = (item) => {
    setPlacedOrders((prev) => [...prev, item.id]);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📦 Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          {orders.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "1rem",
                textAlign: "center",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "150px",
                  height: "180px",
                  objectFit: "contain",
                  marginBottom: "0.5rem",
                }}
              />

              {/* Product Details */}
              <h3>{item.name}</h3>
              <p>{item.brand}</p>
              <p style={{ fontWeight: "bold" }}>₹{item.price}</p>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  onClick={() => addToCart(item)}
                  style={{
                    padding: "6px 12px",
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => handleBuyNow(item)}
                  style={{
                    padding: "6px 12px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Buy Now
                </button>

                {/* ❌ Cancel Button */}
                <button
                  onClick={() => cancelOrder(item.id)}
                  style={{
                    padding: "6px 12px",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>

              {/* ✅ Order Placed Message */}
              {placedOrders.includes(item.id) && (
                <p style={{ color: "green", marginTop: "8px", fontWeight: "bold" }}>
                  ✅ Order placed
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Order;
