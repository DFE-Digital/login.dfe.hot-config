const config = require('./../config');

let adapter;
if (config.storage.type === 'redis') {
  adapter = require('./redis');
} else if (config.storage.type === 'azureblob') {
  adapter = require('./azureBlob');
} else {
  adapter = require('./static');
}

module.exports = adapter;