import React from "react";

function Cart({ cart, removeFromCart, orderNow }) {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px"
          }}
        >
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                textAlign: "center",
                margin: "1rem",
                padding: "1rem",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              {/* Product Image */}
              <div
                style={{
                  width: "180px",
                  height: "220px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.8rem"
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "8px"
                  }}
                />
              </div>

              {/* Product Details */}
              <div style={{ flexGrow: 1 }}>
                <h3 style={{ margin: "0.4rem 0", fontSize: "1.1rem" }}>{item.name}</h3>
                <p style={{ margin: "0.2rem 0", color: "#555" }}>{item.brand}</p>
                <p style={{ margin: "0.4rem 0", fontWeight: "bold" }}>₹{item.price}</p>
              </div>

              {/* Buttons */}
              <button
                onClick={() => orderNow(item)}
                style={{
                  marginTop: "auto",
                  padding: "8px 12px",
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginBottom: "8px"
                }}
              >
                Order Now
              </button>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: "8px 12px",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
