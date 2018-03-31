'use strict';

const express = require('express');
const { asyncWrapper } = require('login.dfe.express-error-handling');

const getAll = require('./getAll');
const getSingle = require('./getSingle');

const router = express.Router();


const routeExport = () => {
  router.get('/', asyncWrapper(getAll));
  router.get('/:id', asyncWrapper(getSingle));

  return router;
};

module.exports = routeExport;
