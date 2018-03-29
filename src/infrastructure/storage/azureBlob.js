'use strict';

const config = require('./../config');
const logger = require('./../logger');
const KeepAliveAgent = require('agentkeepalive').HttpsAgent;
const rp = require('request-promise').defaults({
  agent: new KeepAliveAgent({
    maxSockets: config.hostingEnvironment.agentKeepAlive.maxSockets,
    maxFreeSockets: config.hostingEnvironment.agentKeepAlive.maxFreeSockets,
    timeout: config.hostingEnvironment.agentKeepAlive.timeout,
    keepAliveTimeout: config.hostingEnvironment.agentKeepAlive.keepAliveTimeout,
  }),
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
