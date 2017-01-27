/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/busca-cep/:id              ->  index
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.show = show;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _requestify = require('requestify');

var _requestify2 = _interopRequireDefault(_requestify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

// Gets a cep
function show(req, res) {
  var options = {
    host: 'apps.widenet.com.br',
    port: 80,
    path: '/busca-cep/api/cep/' + req.params.id + '.json'
  };
  console.log(req.params.id);

  _requestify2.default.get('http://apps.widenet.com.br/busca-cep/api/cep/' + req.params.id + '.json')
  //.then(res => response.getBody)
  .then(respondWithResult(res, res.code));
}
//# sourceMappingURL=busca-cep.controller.js.map
