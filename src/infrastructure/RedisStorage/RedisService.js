'use strict';

const Redis = require('ioredis');
const config = require('./../config');

const client = new Redis(config.redis.url);

const getOIDCClients = async () => {
  const result = await client.get('OIDCClients');

  if (!result) {
    return null;
  }

  return JSON.parse(result);
};

const getSAMLClients = async () => {
  const result = await client.get('SAMLClients');
  if (!result) {
    return null;
  }
  return JSON.parse(result);
};


module.exports = {
  getOIDCClients,
  getSAMLClients,
};
