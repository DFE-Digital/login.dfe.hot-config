'use strict';

const Redis = require('ioredis');
const config = require('./../config/index');
const logger = require('./../logger/index');

let client;

class ClientStorage {
  constructor(redisClient) {
    if (redisClient === null || redisClient === undefined) {
      client = new Redis(config.redis.url);
    } else {
      client = redisClient;
    }
  }

  async close() {
    try {
      client.disconnect();
    } catch (e) {
      logger.error(e);
    }
  }

  async GetOIDCClients() {
    return new Promise((resolve, reject) => {
      client.get('OIDCClients').then((result) => {
        if (result === null || result === undefined) {
          resolve(null);
        }
        const parsedClients = JSON.parse(result);

        resolve(parsedClients);
      });
    });
  }

  async GetSAMLClients() {
    return new Promise((resolve, reject) => {
      client.get('SAMLClients').then((result) => {
        if (result === null || result === undefined) {
          resolve(null);
        }
        const parsedClients = JSON.parse(result);

        resolve(parsedClients);
      });
    });
  }
}

module.exports = ClientStorage;
