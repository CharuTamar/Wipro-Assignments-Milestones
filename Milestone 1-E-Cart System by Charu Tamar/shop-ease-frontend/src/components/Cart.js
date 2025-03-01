import { Link } from "react-router-dom";

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container">
            <h2>Your Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty. <Link to="/">Go back to shopping</Link></p>
            ) : (
                <div>
                    <ul className="list-group">
                        {cart.map(item => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>{item.name}</h5>
                                    <p>${item.price} x {item.quantity}</p>
                                    <button onClick={() => updateQuantity(item, item.quantity - 1)} className="btn btn-sm btn-danger">-</button>
                                    <button onClick={() => updateQuantity(item, item.quantity + 1)} className="btn btn-sm btn-success mx-2">+</button>
                                    <button onClick={() => removeFromCart(item)} className="btn btn-sm btn-outline-danger">Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h4 className="mt-3">Total: ${totalPrice.toFixed(2)}</h4>
                    <Link to="/checkout" className="btn btn-primary mt-3">Proceed to Checkout</Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
