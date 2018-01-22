'use strict';

const Redis = require('ioredis');
const config = require('./../config');
const logger = require('./../logger');

const client = new Redis(config.storage.params.url);

const getOIDCClients = async (correlationId) => {
  logger.info(`Getting OIDCClients for request id ${correlationId}`, {correlationId});
  const result = await client.get('OIDCClients');

  if (!result) {
    return null;
  }

  return JSON.parse(result);
};

const getSAMLClients = async (correlationId) => {

  logger.info(`Getting SAMLClients for request id ${correlationId}`, {correlationId});

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
