import { useParams } from "react-router-dom";

const productData = {
  1: { name: "Laptop", description: "A high-performance laptop for work and gaming.", price: "₹55,000"},
  2: { name: "Smartphone", description: "A latest-generation smartphone with an amazing camera.", price: "₹75,000" },
  3: { name: "Tablet", description: "A latest-generation tablet with an amazing screen quality.", price: "₹35,000"},
  4: { name: "Airpods", description: "Noise-canceling headphones with excellent sound quality.", price: "₹15,000" }
};

const ProductDetails = () => {
  const { productId } = useParams();
  const product = productData[productId];

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>Price: {product.price}</strong></p>
    </div>
  );
};

export default ProductDetails;
