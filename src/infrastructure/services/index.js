const config = require('./../config');

let adapter;
if (config.applications.type.toLowerCase() === 'api') {
  adapter = require('./api');
} else if (config.applications.type.toLowerCase() === 'static') {
  adapter = require('./static');
} else {
  throw new Error(`Invalid hot config type ${config.applications.type}`);
}

module.exports = adapter;
