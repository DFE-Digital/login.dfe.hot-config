'use strict';

const express = require('express');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const getAll = require('./getAll');

const router = express.Router();


const routeExport = () => {
  router.get('/', asyncWrapper(getAll));

  return router;
};

module.exports = routeExport;
