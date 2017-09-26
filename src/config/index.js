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
  //   identityMetadata: "https://login.microsoftonline.com/27cc275f-b524-460e-b51c-c5532d1cc54f/.well-known/openid-configuration",
  //   clientID: "f5f9ce9f-aef8-4993-a3d3-7c90142addb7"
  // }
};