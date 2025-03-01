const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));


const products = [
        { id: 1, name: "Wireless Earbuds", price: 2999, image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg" },
        { id: 2, name: "Smartwatch", price: 4999, image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg" },
        { id: 3, name: "Gaming Mouse", price: 1599, image: "https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg" },
        { id: 4, name: "Bluetooth Speaker", price: 3499, image: "https://images.pexels.com/photos/2651794/pexels-photo-2651794.jpeg" },
        { id: 5, name: "Camera", price: 2699, image: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg" },
    ];


// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Place an order
app.post('/api/order', (req, res) => {
    console.log("Order received:", req.body);
    res.json({ message: "Order placed successfully!" });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
