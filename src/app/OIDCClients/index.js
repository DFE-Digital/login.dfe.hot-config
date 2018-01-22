'use strict';

const express = require('express');
const storage = require('../../infrastructure/storage');

const router = express.Router();


const routeExport = () => {
  router.get('/', (req, res) => {
    storage.getOIDCClients(req.header('x-correlation-id')).then((clients) => {
      res.send(clients);
    });
  });

  return router;
};

module.exports = routeExport;
