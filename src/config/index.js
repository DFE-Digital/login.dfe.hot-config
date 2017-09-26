module.exports = {
  hostingEnvironment: {
    env: process.env.NODE_ENV ? process.env.NODE_ENV : 'dev',
    host: process.env.HOST ? process.env.HOST : 'localhost',
    port: process.env.PORT ? process.env.PORT : 4432,
    protocol: (process.env.NODE_ENV ? process.env.NODE_ENV : 'dev') == 'dev' ? 'https' : 'http'
  },
  auth: {
    type: 'secret',
    secret: process.env.JWT_SECRET
  },

  // auth: {
  //   type: 'aad',
  //   identityMetadata: process.env.IDENTITY_METADATA,
  //   clientID: process.env.CLIENT_ID
  // }
};