'use strict';

const express = require('express');
const RedisStorage = require('./../../infrastructure/RedisStorage/RedisService');
const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    const redisStorage = new RedisStorage();

    redisStorage.GetSAMLClients().then((clients) => {
      res.send(clients);
      redisStorage.close();
    });
  });

  return router;
};
