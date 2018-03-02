'use strict';

const express = require('express');
const storage = require('../../infrastructure/storage');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const router = express.Router();

module.exports = () => {
  router.get('/', asyncWrapper((req, res) => {
    storage.getSAMLClients(req.header('x-correlation-id')).then((clients) => {
      res.send(clients);
    });
  }));

  return router;
};
