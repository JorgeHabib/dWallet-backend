const mongoose = require('mongoose');

const StockGroup = new mongoose.Schema({
    name: String,
    amount: Number,
    price: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    maxValue: Number,
    avaragePrice: Number,
    marketValue: {
        type: Number,
        default: 0
    },
    profit: {
        type: Number,
        default: 0
    },
    maxMarketValue: {
        type: Number,
        default: 0
    },
    minMarketValue: {
        type: Number,
        default: 0
    },
    myMoney: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('StockGroup', StockGroup);