'use strict';

const express = require('express');
const bodyParser  = require('body-parser');
const fs  = require('fs');
const jwt = require('./Authorization/JwtAuthorization');
const oidcClients = require('./OIDCClients');
const samlClients = require('./SAMLClients');
const config = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(jwt(config.secret));

app.set('secret', config.secret);

app.use('/oidcclients',oidcClients());
app.use('/samlclients',samlClients());

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
    console.log(`Dev server listening on https://${config.hostingEnvironment.host}:${config.hostingEnvironment.port}`);
  });
} else {
  app.listen(config.hostingEnvironment.port, () => {
    console.log(`Dev server listening on http://${config.hostingEnvironment.host}:${config.hostingEnvironment.port}`);
  });
}