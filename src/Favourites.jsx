// src/Favourites.js
import React from "react";
import { AiFillStar } from "react-icons/ai";

function Favourites({ products, favourites, toggleFavourite, addToCart, orderNow }) {
  const favItems = products.filter(p => favourites.includes(p.id));

  return (
    <div style={{ padding: "1rem" }}>
      <h2>⭐ Favourite Items</h2>
      {favItems.length === 0 ? (
        <p>No favourite items yet.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px"
        }}>
          {favItems.map(item => (
            <div 
              key={item.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                textAlign: "center",
                margin: "1rem",
                padding: "1rem",
                background: "#f9f9f9",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative"
              }}
            >
              {/* Clickable Star (removes from favourites) */}
              <div 
                onClick={() => toggleFavourite(item.id)} 
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer"
                }}
              >
                <AiFillStar size={22} color="gold" />
              </div>

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

              {/* Add to Cart Button */}
              <button 
                onClick={() => addToCart(item)} 
                style={{ 
                  marginTop: "auto", 
                  padding: "8px 12px", 
                  background: "#007bff", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "5px", 
                  cursor: "pointer",
                  marginBottom: "8px"
                }}
              >
                Add to Cart
              </button>

              {/* ✅ Order Now Button (navigates to Orders page) */}
              <button 
                onClick={() => orderNow(item)} 
                style={{ 
                  padding: "8px 12px", 
                  background: "#28a745", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "5px", 
                  cursor: "pointer"
                }}
              >
                Order Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
