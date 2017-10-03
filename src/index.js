'use strict';

const express = require('express');
const bodyParser  = require('body-parser');
const fs  = require('fs');
const morgan = require('morgan');
const winston = require('winston');

const oidcClients = require('./OIDCClients');
const samlClients = require('./SAMLClients');
const config = require('./config');
const auth = require('./Authorization');

console.log(JSON.stringify(config));

const app = express();
const logger = new (winston.Logger)({
  colors: config.loggerSettings.colors,
  transports: [
    new (winston.transports.Console)({ level: 'info', colorize: true }),
  ],
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('logger', logger);
app.use(morgan('combined', { stream: fs.createWriteStream('./access.log', { flags: 'a' }) }));
app.use(morgan('dev'));

app.use(auth(app, config));

app.set('secret', config.secret);

app.use('/oidcclients',oidcClients());
app.use('/samlclients',samlClients());

// Corrs
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

if (config.hostingEnvironment.env === 'dev') {
  app.proxy = true;

  const https = require('https');
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
  app.listen(config.hostingEnvironment.port, () => {
    logger.info(`Dev server listening on http://${config.hostingEnvironment.host}:${config.hostingEnvironment.port}`);
  });
}