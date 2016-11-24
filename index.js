'use strict';

var request = require('./request.js');

module.exports = Client;

function Client (opts) {
  if (!(this instanceof Client)) return new Client(opts);
  if (!opts) opts = {};

  this._url = opts.url || 'https://api.tagplay.co/v1';
  this._iframelyUrl = opts.iframelyUrl || 'http://iframely.tagplay.is';
  this._url = this._url.replace(/\/$/, '');
  this._iframelyUrl = this._iframelyUrl.replace(/\/$/, '');
  this._token = opts.token;
}


/** Project */
Client.prototype.getProject = function(id, options, cb) {
  var url = [this._url, 'project', id].join('/');
  request.get(url, this._token, options, cb);
};

/** Feed */
Client.prototype.listFeed = function(project_id, options, cb) {
  var url = [this._url, 'project', project_id, 'feed'].join('/');
  request.get(url, this._token, options, cb);
};

Client.prototype.getFeed = function(project_id, feed_id, options, cb) {
  var url = [this._url, 'project', project_id, 'feed', feed_id].join('/');
  request.get(url, this._token, options, cb);
};

/** Post */
Client.prototype.listPost = function(project_id, feed_id, options, cb) {
  var url = [this._url, 'project', project_id, 'feed', feed_id, 'post'].join('/');
  request.get(url, this._token, options, cb);
};

Client.prototype.getPost = function(project_id, feed_id, post_id, options, cb) {
  options.token = this._api_key;
  var url = [this._url, 'project', project_id, 'feed', feed_id, 'post', post_id].join('/');
  request.get(url, this._token, options, cb);
};

/** Actions for Post */
Client.prototype.likePost = function(project_id, feed_id, post_id, cb) {
  var url = [this._url, 'project', project_id, 'feed', feed_id, 'post', post_id, 'like'].join('/');
  request.post(url, this._token, null, cb);
};

Client.prototype.unlikePost = function(project_id, feed_id, post_id, cb) {
  var url = [this._url, 'project', project_id, 'feed', feed_id, 'post', post_id, 'unlike'].join('/');
  request.post(url, this._token, null, cb);
};

Client.prototype.flagPost = function(project_id, feed_id, post_id, cb) {
  var url = [this._url, 'project', project_id, 'feed', feed_id, 'post', post_id, 'flag'].join('/');
  request.post(url, this._token, null, cb);
};

Client.prototype.unflagPost = function(project_id, feed_id, post_id, cb) {
  var url = [this._url, 'project', project_id, 'feed', feed_id, 'post', post_id, 'unflag'].join('/');
  request.post(url, this._token, null, cb);
};

/** iframely integration */
Client.prototype.getEmbedInfo = function(link, options, cb) {
  var optionPairs = Object.keys(options).map(function (key) {
    return key + '=' + encodeURIComponent(options[key]);
  });
  var url = [this._iframelyUrl, 'iframely'].join('/') + '?url=' + encodeURIComponent(link) + (options ? ('&' + optionPairs.join('&')) : '');
  request.get(url, null, null, cb);
};
