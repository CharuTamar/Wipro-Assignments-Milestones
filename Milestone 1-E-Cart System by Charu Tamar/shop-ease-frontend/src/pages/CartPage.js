import { useState, useEffect } from "react";
import Cart from "../components/Cart";

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const updateQuantity = (product, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(product);
        } else {
            const updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: newQuantity } : item
            );
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
    };

    const removeFromCart = (product) => {
        const updatedCart = cart.filter(item => item.id !== product.id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <div className="container">
            <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
        </div>
    );
};

export default CartPage;
