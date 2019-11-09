require("dotenv").config();

const SessionController = require('./controllers/SessionController');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

//Connecting to MongoDB
mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, console.log('Connected to MongoDB...'));

mongoose.set('useCreateIndex', true);

//GET, POST, PUT, DELETE

// req.query => acessar query params (URL)
// req.param => acessar query params (extensao URL)
// req.body => acessar corpo da requisicao

app.use(cors())
app.use(express.json());
app.use(routes);
 
app.listen(process.env.PORT || 3030, () => {
    console.log('Server started...');
})