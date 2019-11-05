// index: listagem de controllers
// show: coleta de um unico controller
// store: criar um controller
// update: update do controller
// destroy: destruir controller 
const StockGroup = require('../models/StockGroup');
const SellingStock = require('../models/StockSold');

const profileController = require('./profileController');

module.exports = {
    async update(req, res) {
        const { name, amount, price } = req.body;
        const { user_id } = req.headers;

        const stockGroup = await StockGroup.findOne({ name , user: user_id });

        if (!stockGroup) { 
            console.log('Not existing Stock...');
            return res.json({ error: "Stock does not exist" });
        }else {
            if (stockGroup.amount < amount){
                console.log('Error01: amount not compatible');
                return res.json({ error: "Stock does not have that amount" });
            }

            //Isso ainda permanece aqui para testes em casos em que nao eh permitido o prejuizo...
            
            // if (price*amount - stockGroup.price < 0) {
            //     console.log('Error01: something has gone wrong in stockGroup');
            //     return res.json({ error: "tock with bigger priceS than compatible" });
            // }

            if (stockGroup.amount === amount) {
                const deletedStock = await StockGroup.findOne({ name, user: user_id });

                await StockGroup.deleteOne({ name, user: user_id });

                return res.json(deletedStock);
            }

            stockGroup.amount -= amount;
            stockGroup.price -= price*amount;

            await stockGroup.save();

            await SellingStock.create({ name, amount, price, user: user_id });
        }

        const returnedValue = await SellingStock.findOne({ name, user: user_id }); 

        return res.json(returnedValue);
    },

    async index (req, res) {
        const { user_id } = req.headers;
        const { stock_name } = req.query;

        const stocks = await SellingStock.find({ user: user_id, name: stock_name });

        return res.json(stocks);
    }
}