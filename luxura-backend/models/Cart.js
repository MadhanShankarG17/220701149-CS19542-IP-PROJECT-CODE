const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name: String,
    price: Number,
    size: String,
    quantity: Number,
});

module.exports = mongoose.model('Cart', cartSchema);
