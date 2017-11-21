'use strict';

const express = require('express');
const RedisStorage = require('./../RedisStorage/RedisService');

const router = express.Router();


const routeExport = () => {
  router.get('/', (req, res) => {
    const redisStorage = new RedisStorage();

    redisStorage.GetOIDCClients().then((clients) => {
      res.send(clients);
      redisStorage.close();
    });
  });

  return router;
};

module.exports = routeExport;
