# tagplay
A javascript wrapper for the [Tagplay API](http://tagplay.github.io/api)  
Works both in node.js and the browser with some help from [browserify](http://browserify.org)

## Installation

```bash
$ npm install tagplay
```

## Examples

```js
var client = require('tagplay')({
  token: 'Tagplay Token'
});

// Get info about a Project
client.getProject('project_id', function(error, body) {
  console.log(body); // json object
});
// List Feeds belonging to a Project
client.listFeed('project_id', function(error, body) {
  console.log(body); // json object
});
// List Posts belonging to a Feed
client.listPost('project_id', 'feed_id', function(error, body) {
  console.log(body); // json object
});
// could also limit the result with the limit option
client.listPost('project_id', 'feed_id', {limit: 10}, function(error, body) {
  console.log(body); // json object
});

```

## API

* `getProject(project_id [, options], callback)`
* `listFeed(project_id [, options], callback)`
* `getFeed(project_id, feed_id [, options], callback)`
* `listPost(project_id, feed_id [, options], callback)`
* `getPost(project_id, feed_id, post_id [, options], callback)`

The `options` object accepts the attributes `limit` and `offset` which are used for pagination

* `likePost(project_id, feed_id, post_id, callback)`
* `unlikePost(project_id, feed_id, post_id, callback)`
* `flagPost(project_id, feed_id, post_id, callback)`
* `unflagPost(project_id, feed_id, post_id, callback)`
