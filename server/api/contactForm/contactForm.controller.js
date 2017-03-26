/**
 * Using Rails-like standard naming convention for endpoints.

 * POST    /api/ContactForm              ->  create

 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _contactForm = require('./contactForm.model');

var _contactForm2 = _interopRequireDefault(_contactForm);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressMailer = require('express-mailer');

var _expressMailer2 = _interopRequireDefault(_expressMailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_expressMailer2.default.extend(app, {
  from: 'contato@doebem.org.br',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_SECRET
  }
});

app.set('views', __dirname + '/'); //path.resolve( __dirname, '/'));
app.set('view engine', 'pug');

function handleSendEmail(req, res) {
  app.mailer.send({
    template: 'email',
    bcc: 'contato@doebem.org.br'
  }, {
    to: req.body.Email,
    subject: 'Sua mensagem para a doebem', // REQUIRED.
    message: req.body.Mensagem
  }, function (err) {
    if (err) {
      // handle error
      console.log(err);

      res.send('Ocorreu um erro ao enviar sua mensagem');
      return;
    }
    res.send('Email enviado');
  });
}

// Creates a new ContactForm in the DB
function create(req, res) {
  console.log(req.body);
  return _contactForm2.default.create(req.body).then(handleSendEmail(req, res));
}
//# sourceMappingURL=contactForm.controller.js.map
