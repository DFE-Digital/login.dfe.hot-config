'use strict';
const jwt = require('./JwtAuthorization');
const aad = require('./AadAuthorisation');

module.exports = (app, config) => {
  if (config.auth.type === 'secret') {
   return jwt(config.auth.secret);
  }

  if (config.auth.type === 'aad') {
    const options = {
      identityMetadata: config.auth.identityMetadata,
      clientID: config.auth.clientID,
      validateIssuer: true,
      loggingLevel: 'info',
      passReqToCallback: false
    };

    return aad(app, options)
  }

  throw new Error('no auth strategy defined!')
};