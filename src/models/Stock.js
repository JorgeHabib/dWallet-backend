const mongoose = require('mongoose');

const Stock = new mongoose.Schema({
    name: String,
    amount: Number,
    price: Number,
    date: {
        type: String,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Stock', Stock);