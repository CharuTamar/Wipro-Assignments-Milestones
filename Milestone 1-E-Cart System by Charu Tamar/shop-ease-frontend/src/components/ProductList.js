import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
            .then(res => {
                console.log("Fetched products:", res.data);
                setProducts(res.data);
            })
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    return (
        <div className="container">
            <div className="row">
                {products.length === 0 ? (
                    <p>No products available</p>
                ) : (
                    products.map(product => (
                        <div key={product.id} className="col-md-4">
                            <div className="card">
                                <img src={product.image} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5>{product.name}</h5>
                                    <p>₹{product.price}</p>
                                    <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductList;
