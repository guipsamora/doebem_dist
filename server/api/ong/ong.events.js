/**
 * Ongs model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _ong = require('./ong.model');

var _ong2 = _interopRequireDefault(_ong);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OngEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
OngEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  _ong2.default.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc) {
    OngEvents.emit(event + ':' + doc._id, doc);
    OngEvents.emit(event, doc);
  };
}

exports.default = OngEvents;
//# sourceMappingURL=ong.events.js.map
