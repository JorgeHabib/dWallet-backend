// index: listagem de controllers
// show: coleta de um unico controller
// store: criar um controller
// update: update do controller
// destroy: destruir controller 

require("dotenv").config();

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async index(req, res) {
        const users = await User.find();

        return res.json(users);
    },

    async store(req, res) {
        const email = req.body.email;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).send({ error: 'Email already in use' });
            }else{
                const hash = await bcrypt.hash(req.body.password, 10);

                user = await User.create({ name: req.body.name, email: req.body.email, password: hash });
                user.password = undefined;

                console.log('User registered: ' + req.body.email);            
                return res.json(user);
            }
        }catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }

    },

    async destroy(req, res) {
        const { _id } = req.headers;

        await User.deleteOne({ _id }, (err) => {
            console.log(err);
        });

        return res.send({ ok: true });
    },

    async show(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        if (!await bcrypt.compare(password, user.password)){
            return res.status(400).send({ error: 'Invalid password' })
        }

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: 86400
        });

        return res.send({ user, token });
    }
};