'use strict';

const express = require('express');
const RedisStorage = require('./../RedisStorage/RedisService');

const router = express.Router();


const routeExport = () => {

  router.get('/', function (req, res) {
    let redisStorage = new RedisStorage();

    redisStorage.GetOIDCClients().then((clients) => {
      res.send(clients);
      redisStorage.close();
    });
  });

  return router;
};

module.exports = routeExport;