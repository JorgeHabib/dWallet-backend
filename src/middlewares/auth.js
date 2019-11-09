require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const user_id = req.headers.authorization;

    if (!user_id) {
        return res.status(401).send({ error: 'No token provided' });
    }

    const parts = user_id.split(' ');

    if (!parts.length === 2){
        return res.status(401).send({ error: 'Token error' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformatted' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Invalid token' });
        }

        req.userId = decoded.id;
        return next();
    })
};