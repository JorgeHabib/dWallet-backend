// index: listagem de controllers
// show: coleta de um unico controller
// store: criar um controller
// update: update do controller
// destroy: destruir controller 

const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const users = await User.find();

        return res.json(users);
    },

    async store(req, res) {
        const name = req.body.name;
        const email = req.body.email;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ name, email });
        }else{
            user.updateQueue = [];
        }
        
        await user.save();
        console.log('User logged in...');
        return res.json(user);
    },

    async destroy(req, res) {
        const { _id }= req.headers;

        await User.deleteOne({ _id }, (err) => {
            console.log(err);
        });

        return res.send({ ok: true });
    }
};