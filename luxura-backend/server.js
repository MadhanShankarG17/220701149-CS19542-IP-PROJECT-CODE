const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Allow cross-origin requests
const Cart = require('./models/Cart'); // Import the Cart model
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS

// MongoDB Atlas Connection
const mongoURI = 'mongodb+srv://madhanshankarg:RqDeXYQFb4e87Ngk@cluster0.vojqf.mongodb.net/luxura?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('MongoDB connection error:', error));

// API Routes
app.post('/api/cart', (req, res) => {
    const { cart } = req.body;

    Cart.insertMany(cart)
        .then(() => res.json({ success: true, message: 'Cart saved to MongoDB' }))
        .catch(error => res.status(500).json({ success: false, message: 'Failed to save cart', error }));
});

// Default route
app.get('/', (req, res) => {
    res.send('Luxura Backend is Running');
});

// Start the server
const PORT = 5002;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
