'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser  = require('body-parser');
const RedisStorage = require('./RedisStorage/RedisService');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('secret', process.env.JWT_SECRET)

const port = process.env.PORT;
const router = express.Router();

app.use('/api',router);

router.use((req, res, next) => {

  function getFailureMessage() {
    return {
      success: false,
      message: 'No token provided.'
    };
  }

  // check header or url parameters or post parameters for token
  if(req.headers.authorization === undefined || req.headers.authorization.split(' ').length !== 2){
    return res.status(403).send(getFailureMessage());
  }
  var token = req.headers.authorization.split(' ')[1];

  if (token) {

    jwt.verify(token, app.get('secret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {
    return res.status(403).send(getFailureMessage());
  }
});

router.get('/clients',function(req, res) {
  var redisStorage = new RedisStorage();

  redisStorage.GetClients().then((clients) => {
    res.send(clients);
  });
});

app.listen(port);