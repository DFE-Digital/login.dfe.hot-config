'use strict';


const express = require('express');
const jwt = require('jsonwebtoken');
const RedisStorage = require('./../RedisStorage/RedisService');

const router = express.Router();

module.exports = (secret) => {
  router.get('/', function (req, res) {
    var redisStorage = new RedisStorage();

    redisStorage.GetSAMLClients().then((clients) => {
      res.send(clients);
    });
  });

  return router;
};