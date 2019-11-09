require('dotenv').config();

const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars")
const path = require('path');

var transport = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT_MAILER,
    auth: {
      user: process.env.USER_MAILER,
      pass: process.env.PASS_MAILER
    }
  });

  const handleBarsOptions = {
    viewEngine: {
        extName: '.html',
        defaultLayout: null,
        partialsDir: path.resolve('./src/resources/mail'),
        layoutsDir: path.resolve('./src/resources/mail')
    },
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html',
}

transport.use('compile', hbs(handleBarsOptions))

module.exports = transport;