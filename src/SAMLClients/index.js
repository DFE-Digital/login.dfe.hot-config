'use strict';


const express = require('express');
const jwt = require('jsonwebtoken');
const RedisStorage = require('./../RedisStorage/RedisService');

const router = express.Router();

module.exports = () => {
  router.get('/', function (req, res) {
    let redisStorage = new RedisStorage();

    redisStorage.GetSAMLClients().then((clients) => {
      res.send(clients);
      redisStorage.close();
    });
  });

  return router;
};