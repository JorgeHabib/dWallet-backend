// index: listagem de controllers
// show: coleta de um unico controller
// store: criar um controller
// update: update do controller
// destroy: destruir controller 
const SwingStock = require('../models/SwingStock');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { name, amount } = req.body;
        const user_id = req.userId;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(200).json({ error: 'User does not exists...' });
        }

        const swingStock = await SwingStock.create({
            name,
            amount,
            user: user_id
        });

        return res.json(swingStock);
    },

    async index (req, res) {
        const user_id = req.userId;

        const SwingStocks = await SwingStock.find({ user: user_id });

        return res.json(SwingStocks);
    },

    async update (req, res) {
        const { name, amount } = req.body;
        const user_id = req.userId;

        const Swing_Stock = await SwingStock.findOne({ name, user: user_id });
        
        Swing_Stock.amount = amount;

        await Swing_Stock.save();

        return res.json(Swing_Stock);
    },

    async destroy (req, res) {
        const { name } = req.body;
        const user_id = req.userId;

        await SwingStock.deleteOne({ name, user: user_id });

        return res.json({ deleted: true })
    }
}