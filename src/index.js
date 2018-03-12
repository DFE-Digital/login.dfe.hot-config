'use strict';

const config = require('./infrastructure/config');
const logger = require('./infrastructure/logger');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');
const http = require('http');
const https = require('https');
const oidcClients = require('./app/OIDCClients');
const samlClients = require('./app/SAMLClients');
const auth = require('login.dfe.api.auth');
const healthCheck = require('login.dfe.healthcheck');
const { getErrorHandler } = require('login.dfe.express-error-handling');
const KeepAliveAgent = require('agentkeepalive');

const { hotConfigSchema, validateConfigAndQuitOnError } = require('login.dfe.config.schema');

validateConfigAndQuitOnError(hotConfigSchema, config, logger);

http.GlobalAgent = new KeepAliveAgent({
  maxSockets: 10,
  maxFreeSockets: 2,
  timeout: 60000,
  keepAliveTimeout: 300000,
});
https.GlobalAgent = new KeepAliveAgent({
  maxSockets: 10,
  maxFreeSockets: 2,
  timeout: 60000,
  keepAliveTimeout: 300000,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('logger', logger);
app.use(morgan('combined', { stream: fs.createWriteStream('./access.log', { flags: 'a' }) }));
app.use(morgan('dev'));

app.set('secret', config.secret);

app.use('/healthcheck', healthCheck({ config }));


app.use(auth(app, config));

app.use('/oidcclients', oidcClients());
app.use('/samlclients', samlClients());

// Corrs
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Error handling
app.use(getErrorHandler({
  logger,
}));

if (config.hostingEnvironment.env === 'dev') {
  app.proxy = true;

  const options = {
    key: fs.readFileSync('./ssl/localhost.key'),
    cert: fs.readFileSync('./ssl/localhost.cert'),
    requestCert: false,
    rejectUnauthorized: false,
  };
  const server = https.createServer(options, app);

  server.listen(config.hostingEnvironment.port, () => {
    logger.info(`Dev server listening on https://${config.hostingEnvironment.host}:${config.hostingEnvironment.port}`);
  });
} else {
  app.listen(process.env.PORT, () => {
    logger.info(`Dev server listening on http://${config.hostingEnvironment.host}:${config.hostingEnvironment.port}`);
  });
}
