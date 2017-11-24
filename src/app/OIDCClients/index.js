'use strict';

const express = require('express');
const RedisStorage = require('./../../infrastructure/RedisStorage/RedisService');

const router = express.Router();


const routeExport = () => {
  router.get('/', (req, res) => {
    RedisStorage.getOIDCClients().then((clients) => {
      res.send(clients);
    });
  });

  return router;
};

module.exports = routeExport;
