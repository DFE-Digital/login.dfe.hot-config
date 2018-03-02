'use strict';

const express = require('express');
const storage = require('../../infrastructure/storage');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const router = express.Router();


const routeExport = () => {
  router.get('/', asyncWrapper((req, res) => {
    storage.getOIDCClients(req.header('x-correlation-id')).then((clients) => {
      res.send(clients);
    });
  }));

  return router;
};

module.exports = routeExport;
