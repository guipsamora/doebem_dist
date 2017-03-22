'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.postCieloApi = postCieloApi;
exports.captureCieloApi = captureCieloApi;
exports.handlePayment = handlePayment;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _checkoutForm = require('./checkoutForm.model');

var _checkoutForm2 = _interopRequireDefault(_checkoutForm);

var _requestify = require('requestify');

var _requestify2 = _interopRequireDefault(_requestify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const winston = require('winston');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
} /*
   * Using Rails-like standard naming convention for endpoints.
   * GET     /api/checkoutForm              ->  index
   * POST    /api/checkoutForm              ->  create
   * GET     /api/checkoutForm/:id          ->  show
   * PUT     /api/checkoutForm/:id          ->  upsert
   * PATCH   /api/checkoutForm/:id          ->  patch
   * DELETE  /api/checkoutForm/:id          ->  destroy
   */

// 'use strict';

function patchUpdates(patches) {
  return function (entity) {
    try {
      _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
    } catch (err) {
      return _promise2.default.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Transaction
function index(req, res) {
  return _checkoutForm2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Transaction from the DB from id or from slug...
function show(req, res) {
  return _checkoutForm2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(function (err) {
    _checkoutForm2.default.findOne({ slug: req.params.id }).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(err));
  });
}

function postCieloApi(req, res) {
  console.log('postCieloApi foi chamado');
  var postPromise = new _promise2.default(function (resolve, reject) {
    _requestify2.default.request('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/', {
      method: 'POST',
      body: {
        Customer: req.Customer,
        Payment: req.Payment,
        MerchantOrderId: req.MerchantOrderId
      },
      headers: {
        'Content-Type': 'application/json',
        MerchantId: process.env.MerchantId,
        MerchantKey: process.env.MerchantKey
      },
      dataType: 'json'
    }).then(function (response) {
      console.log('Requestify deu certo no postCieloApi');
      // get the response body
      response.getBody();

      // get the response headers
      response.getHeaders();

      // get specific response header
      response.getHeader('Accept');

      // get the code
      response.getCode();

      resolve(response.body);
    }).catch(function (error) {
      console.log('Requestify no postCieloApi apresentou o seguinte erro: ', error);
      reject(error);
      return handleError(res);
    });
  });
  return postPromise;
}

function captureCieloApi(req, res) {
  console.log('captureCieloApi foi chamado');
  var putPromise = new _promise2.default(function (resolve, reject) {
    _requestify2.default.request(req.req.body.AuthorizationResponse.Payment.Links[1].Href, {
      method: 'PUT',
      body: {
        PaymentId: req.req.body.AuthorizationResponse.Payment.PaymentId
      },
      headers: {
        'Content-Type': 'application/json',
        MerchantId: process.env.MerchantId,
        MerchantKey: process.env.MerchantKey
      },
      dataType: 'json'
    }).then(function (response) {
      console.log('requestify deu certo no captureCieloApi');
      // get the response body
      response.getBody();

      // get the response headers
      response.getHeaders();

      // get specific response header
      response.getHeader('Accept');

      // get the code
      response.getCode();

      resolve(response.body);
    }).catch(function (error) {
      console.log('Requestify no captureCieloApi apresentou o seguinte erro: ', error);
      reject(error);
      return handleError(res);
    });
  });
  return putPromise;
}

// Creates a new Transaction in the DB
// export function create(req, res) {
// console.trace(req.body);
// var info = req.body;
// var checkout = new CheckoutForm({MerchantOrderId: "TESTE"});

// console.trace(checkout);
// console.log(checkout);
// // checkout = postCieloApi(req, res).then(function(success) {
// //   console.trace(success);
// //   return success}
// // );  

// return postCieloApi(req, res)
// .then(function(success) {
//   CheckoutForm.Transactions.create(success);
//   console.trace(success);
//   return success}
// ).then(
//   CheckoutForm.save(req.body)
// ).then(respondWithResult(res, 201))
//  .catch(error => {
//     console.log('create na API da Transaction', error);
//     return handleError(res);
//  });


// chamar post Cielo e colocar no CheckoutForm
// return CheckoutForm.create(req.body)
//   .then(function() {
//     return postCieloApi(req, res)
//     .then(saveAuthor)
//   })
//   .then(respondWithResult(res, 201))
//   .catch(error => {
//     console.log('create na API da Transaction', error);
//     return handleError(res);
//   });
// }

function handlePayment(req, res) {
  return postCieloApi(req.body).then(function (responsePost) {
    req.body.AuthorizationResponse = JSON.parse(responsePost);
    return req.body;
  }).then(function (reqAuth) {
    return _checkoutForm2.default.create(reqAuth).then(respondWithResult(res, 201)).catch(function (error) {
      console.log('create na API da Transaction', error);
      return handleError(res);
    });
  }).then(function (responseCreate) {
    return captureCieloApi(responseCreate).then(function (responsePut) {
      req.body.CaptureResponse = JSON.parse(responsePut);
      return _checkoutForm2.default.findOneAndUpdate({ MerchantOrderId: req.body.MerchantOrderId }, { $set: req.body }, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().catch(function (error) {
        console.log('Update na API Transactions got an error: ', error);
        return handleError(res);
      });
    });
  }).catch(function (error) {
    console.log('create na API da Transaction', error);
    return handleError(res);
  });
}

// Upserts the given Thing in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _checkoutForm2.default.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec().then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Transaction in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _checkoutForm2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Transaction from the DB
function destroy(req, res) {
  return _checkoutForm2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=checkoutForm.controller.js.map
