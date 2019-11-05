const express = require('express');

const SessionController = require('./controllers/SessionController');
const StockController = require('./controllers/stockController');
const profileController = require('./controllers/profileController');
const sellController = require('./controllers/sellController');

const routes = express.Router();

routes.post('/sessions', SessionController.store);
routes.get('/sessions', SessionController.index);
routes.delete('/session/delete', SessionController.destroy);

routes.get('/stocks', StockController.index);
routes.post('/stocks/new', StockController.store);
routes.delete('/stocks/delete', StockController.destroy);

routes.get('/profile/show', profileController.show);
routes.delete('/profile/delete', profileController.destroy);
routes.put('/profile/update', profileController.update);

routes.post('/sell', sellController.update);
routes.get('/sell', sellController.index);

routes.get('/teste/senha12345', (req, res) => {
    res.send({ ok: true });
})


module.exports = routes;