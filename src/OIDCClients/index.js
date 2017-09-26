'use strict';

const express = require('express');
const RedisStorage = require('./../RedisStorage/RedisService');

const router = express.Router();


const routeExport = () => {

    router.get('/', function(req, res) {
      var redisStorage = new RedisStorage();

      redisStorage.GetOIDCClients().then((clients) => {
        res.send(clients);
      });
    });

  return router;
}

module.exports = routeExport;