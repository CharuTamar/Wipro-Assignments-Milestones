// PRODUCT LIST PAGE

import { Link } from "react-router-dom"

// PRODUCT LIST
const products = [
    {
        id: 1, name: "Laptop"
    },
    {
        id: 2, name: "Smartphone"
    },
    {
        id: 3, name: "Tablet"
    },
    {
        id: 4, name: "Airpods"
    }
]

function Products() {
    return (
        <div>
            <h2>Products</h2>
            <ul> {
                products.map((product) => (
                    <li key={product.id}>
                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </li>
                )
                )
            }
            </ul>
        </div>
    );
}


export default Products;