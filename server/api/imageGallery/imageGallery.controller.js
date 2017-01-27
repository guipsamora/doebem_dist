/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/imageGallery              ->  index
 * POST    /api/imageGallery              ->  create
 * GET     /api/imageGallery/:id          ->  show
 * DELETE  /api/imageGallery/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.index = index;
exports.show = show;
exports.destroy = destroy;

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.update({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  region: 'us-east-1'
});
var s3 = new _awsSdk2.default.S3();
var params = {
  Bucket: 'doebem'
};
var s3Url = 'https://s3-sa-east-1.amazonaws.com/doebem';

exports.signing = function (req, res) {
  var request = req.body;
  var fileName = request.filename;
  var path = fileName;

  var readType = 'public-read';

  var expiration = (0, _moment2.default)().add(5, 'm').toDate(); //15 minutes

  var s3Policy = {
    expiration: expiration,
    conditions: [{
      bucket: 'doebem'
    }, ['starts-with', '$key', path], {
      acl: readType
    }, {
      success_action_status: '201'
    }, ['starts-with', '$Content-Type', request.type], ['content-length-range', 2048, 10485760]]
  };

  var stringPolicy = (0, _stringify2.default)(s3Policy);
  var base64Policy = new Buffer(stringPolicy, 'utf-8').toString('base64');

  // sign policy
  var signature = _crypto2.default.createHmac('sha1', process.env.aws_secret_access_key).update(new Buffer(base64Policy, 'utf-8')).digest('base64');

  var credentials = {
    url: s3Url,
    fields: {
      key: path,
      AWSAccessKeyId: process.env.aws_access_key_id,
      acl: readType,
      policy: base64Policy,
      signature: signature,
      'Content-Type': request.type,
      success_action_status: 201
    }
  };
  res.jsonp(credentials);
};

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of images
function index(req, res) {
  return s3.listObjects(params).promise().then(function (data) {
    var images = [];
    data.Contents.map(function (image) {
      images.push(image.Key);
    });
    return res.status(200).json(images);
  }).catch(function (err) {
    console.log(err);
    return handleError(res);
  });
}

// Gets a single Posts from the DB
function show(req, res) {}
/*return Posts.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));*/


// Deletes a image from the s3
function destroy(req, res) {
  var paramsToDelete = {
    Bucket: 'doebem',
    Key: req.params.id
  };
  s3.deleteObject(paramsToDelete).promise().then(function (result) {
    console.log(result);
    return res.status(200);
  }).catch(function (err) {
    console.log(err);
    return handleError(res);
  });
}
//# sourceMappingURL=imageGallery.controller.js.map
