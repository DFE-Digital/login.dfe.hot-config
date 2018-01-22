const config = require('./../config');

let adapter;
if (config.storage.type === 'redis') {
  adapter = require('./redis');
} else {
  throw new Error(`Unrecognised storage type ${config.storage.type}in config`);
}

module.exports = adapter;