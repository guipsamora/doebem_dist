/**
 * Thing model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _contactForm = require('./contactForm.model');

var _contactForm2 = _interopRequireDefault(_contactForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContactFormEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
_contactForm2.default.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _contactForm2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    ContactFormEvents.emit(event + ':' + doc._id, doc);
    ContactFormEvents.emit(event, doc);
  };
}

exports.default = ContactFormEvents;
//# sourceMappingURL=contactForm.events.js.map
