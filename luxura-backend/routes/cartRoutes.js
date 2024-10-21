// routes/cartRoutes.js
const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Add item to cart
router.post('/add', async (req, res) => {
    try {
        const { productName, size, quantity, price } = req.body;

        const totalPrice = quantity * price;

        // Create a new cart item
        const cartItem = new Cart({
            productName,
            size,
            quantity,
            price,
            totalPrice
        });

        // Save the item to the database
        await cartItem.save();

        res.status(201).json({ message: 'Item added to cart', cartItem });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add item to cart', error });
    }
});

module.exports = router;
