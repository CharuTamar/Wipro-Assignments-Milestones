import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Product";
import ProductDetails from "./Pages/ProductDetails";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/product" >Product</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
