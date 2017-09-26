'use strict';
const jwt = require('./JwtAuthorization');
const aad = require('./AadAuthorisation');

module.exports = (app, config) => {
  if (config.auth.type === 'secret') {
   app.use(jwt(config.auth.secret));
  }

  if (config.auth.type === 'aad') {
    const options = {
      identityMetadata: config.auth.identityMetadata,
      clientID: config.auth.clientID,
      validateIssuer: true,
      loggingLevel: 'info',
      passReqToCallback: false
    };

    app.use(aad(app, options))
  }
};