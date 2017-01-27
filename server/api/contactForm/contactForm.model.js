'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contactFormSchema = new _mongoose2.default.Schema({
  fistName: String,
  lastName: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

exports.default = _mongoose2.default.model('contactForm', contactFormSchema);
//# sourceMappingURL=contactForm.model.js.map
