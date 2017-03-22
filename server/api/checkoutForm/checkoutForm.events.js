/**
 * Thing model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _checkoutForm = require('./checkoutForm.model');

var _checkoutForm2 = _interopRequireDefault(_checkoutForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckoutFormEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
_checkoutForm2.default.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _checkoutForm2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    CheckoutFormEvents.emit(event + ':' + doc._id, doc);
    CheckoutFormEvents.emit(event, doc);
  };
}

exports.default = CheckoutFormEvents;
//# sourceMappingURL=checkoutForm.events.js.map
