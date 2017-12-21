'use strict';

const express = require('express');
const RedisStorage = require('./../../infrastructure/RedisStorage/RedisService');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    RedisStorage.getSAMLClients(req.header('x-correlation-id')).then((clients) => {
      res.send(clients);
    });
  });

  return router;
};
