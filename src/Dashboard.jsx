import { useState } from 'react'
import './Dashboard.css'
import Favourites from "./Favourites";
import { useNavigate } from 'react-router-dom';
import Order from "./order";   
import Cart from "./cart";    
import { RiLogoutBoxRFill } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi"; // hamburger icon
import image from './assets/nike.png'
import levis from './assets/levis.png'
import adidas from './assets/adidas.png'
import puma from './assets/puma.jpg'
import zara from './assets/zara.jpg'
import fossil from './assets/fossil.jpg'
import ray from './assets/ray.jpg'
import bag from './assets/bag.jpg'
import belt from './assets/belt.jpg'
import shoe from './assets/shoe.jpg'
import saree from './assets/saree.webp'
import churidhar from './assets/churidhar.jpg'

const products = [
  { id: 1, name: "Shoe", price: 499, brand: "Nike", image: image },
  { id: 2, name: "Jeans", price: 1299, brand: "Levis", image: levis },
  { id: 3, name: "Sneakers", price: 2999, brand: "Adidas", image: adidas },
  { id: 4, name: "Cap", price: 299, brand: "Puma", image: puma },
  { id: 5, name: "Jacket", price: 1999, brand: "Zara", image: zara },
  { id: 6, name: "Watch", price: 4999, brand: "Fossil", image: fossil },
  { id: 7, name: "Sunglasses", price: 1499, brand: "Ray-Ban", image: ray },
  { id: 8, name: "Handbag", price: 2499, brand: "Gucci", image: bag },
  { id: 9, name: "Belt", price: 799, brand: "Tommy Hilfiger", image: belt },
  { id: 10, name: "Shoes", price: 3499, brand: "Reebok", image: shoe },
  { id: 11, name: "Saree", price: 5999, brand: "Silk", image: saree },
  { id: 12, name: "Churidhar", price: 599, brand: "Zudio", image: churidhar }
];

function App() {
  const [cart, setCart] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [orders, setOrders] = useState([]);  
  const [activePage, setActivePage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false); // for hamburger toggle

  const handleLogout = () => {
  window.location.href = "/Login";
};


  const addToCart = (product) => setCart([...cart, product]);
  const orderNow = (product) => { setOrders([...orders, product]); setActivePage("order"); }
  const toggleFavourite = (id) => {
    if (favourites.includes(id)) setFavourites(favourites.filter(favId => favId !== id));
    else setFavourites([...favourites, id]);
  };

  return (
    <>
      {/* Header */}
      <header className="header" style={{ padding: "0.5rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo / Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <GiHamburgerMenu size={50} className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer" }} />
          <h2 style={{ margin: 0 }}>Shopfusion</h2>
        </div>

        {/* Menu Items */}
        <ul className={`menu ${menuOpen ? "open" : ""}`} style={{
          listStyle: "none",
          display: "flex",
          gap: "1rem",
          margin: 0,
          padding: 0,
          alignItems: "center",
          
        }}>
          <li onClick={() => { setActivePage("home"); setMenuOpen(false); }}>Home</li>
          <li onClick={() => { setActivePage("favourites"); setMenuOpen(false); }}>Favourite</li>
          <li onClick={() => { setActivePage("order"); setMenuOpen(false); }}>Order</li>
          <li onClick={() => { setActivePage("cart"); setMenuOpen(false); }}>Cart ({cart.length})</li>
          <li onClick={handleLogout} style={{cursor: "pointer"}}>
  Logout <RiLogoutBoxRFill size={20} />
</li>

        </ul>
      </header>

      {/* Pages */}
      {activePage === "home" && (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} style={{ border: "1px solid #ccc", borderRadius: "10px", textAlign: "center", margin: "1rem", padding: "1rem", background: "#f9f9f9", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
              <div onClick={() => toggleFavourite(product.id)} style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer" }}>
                <AiFillStar size={22} color={favourites.includes(product.id) ? "gold" : "lightgray"} />
              </div>
              <div style={{ width: "180px", height: "220px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.8rem" }}>
                <img src={product.image} alt={product.name} style={{ maxWidth: "90%", maxHeight: "60%", objectFit: "contain", borderRadius: "8px" }} />
              </div>
              <div style={{ flexGrow: 0 }}>
                <h3 style={{ margin: "0.4rem 0", fontSize: "1.1rem" }}>{product.name}</h3>
                <p style={{ margin: "0.2rem 0", color: "#555" }}>{product.brand}</p>
                <p style={{ margin: "0.4rem 0", fontWeight: "bold" }}>₹{product.price}</p>
              </div>
              <button onClick={() => addToCart(product)} style={{ marginTop: "auto", padding: "8px 12px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "8px" }}>Add to Cart</button>
              <button onClick={() => orderNow(product)} style={{ padding: "8px 12px", background: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Order Now</button>
            </div>
          ))}
        </div>
      )}

      {activePage === "favourites" && (
        <Favourites 
          products={products}
          favourites={favourites}
          toggleFavourite={toggleFavourite}
          addToCart={addToCart}
          orderNow={(item) => { setOrders([...orders, item]); setActivePage("order"); }}
        />
      )}

      {activePage === "order" && (
        <Order
          orders={orders}
          addToCart={addToCart}
          cancelOrder={(id) => { setOrders(orders.filter((o) => o.id !== id)); }}
        />
      )}

      {activePage === "cart" && (
        <Cart
          cart={cart}
          removeFromCart={(id) => setCart(cart.filter(item => item.id !== id))}
          orderNow={(item) => { setOrders([...orders, item]); setCart(cart.filter(c => c.id !== item.id)); setActivePage("order"); }}
        />
      )}
    </>
  )
}

export default App;
