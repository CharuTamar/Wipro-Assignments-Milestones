import ProductList from "../components/ProductList";

const Home = ({ cart, setCart }) => {
    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        let updatedCart;
        if (existingProduct) {
            updatedCart = cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }
        setCart(updatedCart);
    };

    return (
        <div>
            <h1>Welcome to ShopEase By Charu</h1>
            <ProductList addToCart={addToCart} />
        </div>
    );
};

export default Home;
