'use strict';

const express = require('express');
const bodyParser  = require('body-parser');
const api = require('./api');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('secret', process.env.JWT_SECRET)

const port = process.env.PORT;

app.use('/api',api(app.get('secret')));

app.listen(port);