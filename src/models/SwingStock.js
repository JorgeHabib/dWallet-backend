const mongoose = require('mongoose');

const SwingStock = new mongoose.Schema({
    name: String,
    amount: Number,
    price: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('SwingStock', SwingStock);