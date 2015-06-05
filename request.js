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
  request(method, url)
    //.set('User-Agent', 'tagplay npm lib v0.0.0')
    .set('Authorization', 'Bearer ' + token)
    .end(function(response) {
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

  var qs = Object.keys(options).map(function(key) {
    if (key === 'limit' || key === 'offset') {
      return key + '=' + options[key];
    }
  }).filter(Boolean);
  return qs.length ? '?' + qs.join('&') : '';
}
