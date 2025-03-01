import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Confirmation from "./components/Confirmation";

function App() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <Router>
            <Navbar cart={cart} /> {/* ✅ Pass cart to Navbar */}
            <Routes>
                <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
                <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
                <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
                <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
        </Router>
    );
}

export default App;
