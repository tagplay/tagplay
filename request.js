'use strict';

var request = require('superagent');

exports.get = get;
exports.post = post;

function get(url, token, options, cb) {
  submit('GET', url, token, options, cb);
}

function post(url, token, options, cb) {
  submit('POST', url, token, options, cb);
}

function submit(method, url, token, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = undefined;
  }

  url = url + querystring(options);

  var req = request(method, url);
  if (token) {
    req.set('Authorization', 'Bearer ' + token);
  }
  req.timeout({ response: 30 * 1000 }); // 30 seconds
  req.end(function(err, response) {
    if (err) {
      return cb(err);
    }
    var body = response.body;
    if (!response.ok) {
      body.statusCode = response.statusCode;
      return cb(body);
    }
    return cb(null, body);
  });
}

function querystring(options) {
  if (!options) return '';

  var allowedKeys = ['limit', 'offset', 'filter']

  var qs = Object.keys(options).map(function(key) {
    if (allowedKeys.indexOf(key) !== -1) {
      return key + '=' + options[key];
    }
  }).filter(Boolean);
  return qs.length ? '?' + qs.join('&') : '';
}
