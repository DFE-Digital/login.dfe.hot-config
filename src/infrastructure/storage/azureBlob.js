'use strict';

const config = require('./../config');
const logger = require('./../logger');
const rp = require('request-promise').defaults({
  forever: true,
  keepAlive: true,
});

const getOIDCClients = async (correlationId) => {
  logger.info(`Getting OIDCClients for request id ${correlationId}`, { correlationId });

  const response = await rp({
    method: 'GET',
    uri: config.storage.params.oidcUrl,
    json: true,
  });

  return response;
};

const getSAMLClients = async (correlationId) => {
  logger.info(`Getting SAMLClients for request id ${correlationId}`, { correlationId });

  const response = await rp({
    method: 'GET',
    uri: config.storage.params.samlUrl,
    json: true,
  });

  return response;
};


module.exports = {
  getOIDCClients,
  getSAMLClients,
};
