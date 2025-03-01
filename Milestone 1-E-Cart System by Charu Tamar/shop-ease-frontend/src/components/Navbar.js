import { Link } from "react-router-dom";
import { FaShoppingCart, FaHome } from "react-icons/fa";

const Navbar = ({ cart }) => {
    // Calculate total items in cart
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold fs-4 text-white" to="/">ShopEase By Charu Tamar</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-white fw-semibold px-3" to="/">
                                <FaHome className="me-1" /> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white fw-semibold px-3 position-relative" to="/cart">
                                <FaShoppingCart className="me-1" /> Cart 
                                {cartCount > 0 && (  // Show badge only when cart has items
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
