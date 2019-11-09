require("dotenv").config();

const Stocks = require('../models/Stock');
const StockGroup = require('../models/StockGroup');
const User = require('../models/User');
const stockAPI = require('stocks.js');

const stocks = new stockAPI(process.env.STOCK_KEY_API);

module.exports = {
    async show(req, res) {
        const user_id = req.userId;

        const Stock_Group = await StockGroup.find({ user: user_id });

        return res.json(Stock_Group);
    },

    async destroy(req, res) {
        const { user_id, name } = req.headers;

        const stock_Group = await StockGroup.findOne({ user: user_id, name });
        
        if (!stock_Group) {
            console.log('StockGroup does not match');
            return res.json({ ok: false });
        }

        await StockGroup.deleteOne({ user: user_id, name });

        return res.json(stock_Group);
    },

    async update(req, res) {
        const user_id = req.userId;
        const stockGroups = await StockGroup.find({ user: user_id });
        
        const user = await User.findOne({ _id: user_id });

        if (!user) {
            console.log('Could not find user: ' + user_id);
            return res.send({ ok: false })
        } else {
            let stockNames = user.updateQueue;

            if (stockNames.length >= 30){
                stockNames = [];
            }
    
            console.log('[1] Collecting Stock Names...');
            for (let i = 0; i < stockGroups.length; i++){
                stockNames.push( `${stockGroups[i].name}.SAO` );
            }
    
            console.log(stockNames);
    
            console.log('[2] Collecting Stock Values...');
    
            let timeStaps = stockNames.length;
            if (timeStaps > 5) {
                timeStaps = 5;
            }
    
            for (let i = 0; i < timeStaps; i++) {
                const iterationName = stockNames.shift();
    
                console.log('Processing stock: ' + iterationName);
                let result = await stocks.timeSeries({
                    symbol: iterationName,
                    interval: '5min',
                    amount: 1
                });
    
                try{ 
                    let value;
                    if (result) {
                        const name = iterationName.slice(0, -4);
    
                        console.log('Waiting for: ' + name);
    
                        let stockMoment = await StockGroup.findOne({ user: user_id, name });
    
                        value = result[0].open;
    
                        console.log('Got value: ' + value);
                        
                        if (stockMoment.maxMarketValue < value) {
                            stockMoment.maxMarketValue = value;
                        }
                        
                        if (stockMoment.minMarketValue === 0) {
                            stockMoment.minMarketValue = value;
                        }
    
                        if ( stockMoment.minMarketValue > value ) {
                            stockMoment.minMarketValue = value;
                        }
            
                        stockMoment.marketValue = value;
                        stockMoment.myMoney = value * stockMoment.amount;
                        stockMoment.profit = stockMoment.myMoney - stockMoment.price;
    
                        await stockMoment.save();    
                    }else{
                        console.log('Invaling call to API...');
                        stockNames.unshift(iterationName);
                    }
                } catch (err) {
                    console.log('[ERR] Limited API calls...');
                }
            }
            
            user.save();
    
            console.log('[3] Saving Changes...');
            console.log('[4] Saving User Changes...');
            console.log('[5] Done Updating Stock Prices');
            
            return res.send(stockGroups);
        }
    }
}