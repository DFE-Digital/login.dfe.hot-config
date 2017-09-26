'use strict'

const redis = require('ioredis');
let client;

class ClientStorage {

  constructor(redisClient){
    if(redisClient === null || redisClient === undefined){
      client = new redis(process.env.REDIS_CONNECTION);
    } else{
      client = redisClient;
    }
  }

  async GetOIDCClients(){
    return new Promise((resolve, reject) => {
      client.get('OIDCClients').then((result) => {
        if(result === null || result === undefined){
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
        if(result === null || result === undefined){
          resolve(null);
        }
        const parsedClients = JSON.parse(result);

        resolve(parsedClients);
      });
    });
  }
};

module.exports = ClientStorage;