import { Link } from "react-router-dom";

const Confirmation = () => {
    return (
        <div className="container text-center mt-5">
            <h2>Order Confirmed! 🎉</h2>
            <p>Thank you for your purchase! Your order has been successfully placed.</p>
            <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
        </div>
    );
};

export default Confirmation;
