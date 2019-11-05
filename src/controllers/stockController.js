// index: listagem de controllers
// show: coleta de um unico controller
// store: criar um controller
// update: update do controller
// destroy: destruir controller 

const Stocks = require('stocks.js');
const stocks = new Stocks('MN96PTATN5F5WDU3');

const Stock = require('../models/Stock');
const StockGroup = require('../models/StockGroup');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const { stock_name } = req.query;
        const { user_id } = req.headers;

        const stocks = await Stock.find({ name: stock_name, user: user_id });

        return res.json(stocks);
    },

    async store(req, res) {
        const { name, price, amount} = req.body;

        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User does not exists...' });
        }

        const minMarketValue = price;

        const stock = await Stock.create({
            user: user_id,
            name,
            amount,
            price,
            minMarketValue
        })

        const stockGroup = await StockGroup.findOne({ name: name, user: user_id });

        if (!stockGroup) {
            await StockGroup.create({ name, amount, price: price*amount, maxValue: price, user: user_id, avaragePrice: price });
        }else{
            stockGroup.price += price*amount;
            stockGroup.amount += amount;

            if (price > stockGroup.maxValue) stockGroup.maxValue = price;

            stockGroup.avaragePrice = stockGroup.price / stockGroup.amount;

            await stockGroup.save();
        }

        return res.json(stock);
    },

    async destroy(req, res) {

        const { _id }= req.headers;

        await Stock.deleteOne({ _id }, (err) => {
            if(err) {
                console.log(err);
            }else{
                console.log('User deleted');
            }
        })


        return res.send({ ok: true });
    }
};