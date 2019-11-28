const express = require('express');

const SessionController = require('./controllers/SessionController');
const StockController = require('./controllers/stockController');
const profileController = require('./controllers/profileController');
const sellController = require('./controllers/sellController');
const swingController = require('./controllers/swingController');

const authUserMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.use('/profile/update', authUserMiddleware);
routes.use('/stocks', authUserMiddleware);
routes.use('/stocks/new', authUserMiddleware);
routes.use('/profile/show', authUserMiddleware);
routes.use('/profile/update', authUserMiddleware);
routes.use('/sell', authUserMiddleware);
routes.use('/swing/show', authUserMiddleware);
routes.use('/swing/add', authUserMiddleware);
routes.use('/swing/update', authUserMiddleware);
routes.use('/swing/delete', authUserMiddleware);
routes.use('/teste/senha12345', authUserMiddleware);

routes.post('/sessions/register', SessionController.store);
routes.post('/sessions/authenticate', SessionController.show);
routes.get('/sessions', SessionController.index);
routes.delete('/session/delete', SessionController.destroy);
routes.post('/sessions/forgotpassword', SessionController.update);
routes.post('/sessions/resetpassword', SessionController.resetpassword);

routes.get('/stocks', StockController.index);
routes.post('/stocks/new', StockController.store);
routes.delete('/stocks/delete', StockController.destroy);

routes.get('/profile/show', profileController.show);
routes.delete('/profile/delete', profileController.destroy);
routes.put('/profile/update', profileController.update);

routes.get('/swing/show', swingController.index);
routes.post('/swing/add', swingController.store);
routes.put('/swing/update', swingController.update);
routes.post('/swing/delete', swingController.destroy);

routes.post('/sell', sellController.update);
routes.get('/sell', sellController.index);

routes.get('/teste/senha12345', (req, res) => {
    res.send({ ok: true , user: req.userId});
})


module.exports = routes;