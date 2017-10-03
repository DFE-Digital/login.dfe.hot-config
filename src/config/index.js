const renderConfig = () => {
  const isDev = process.env.NODE_ENV === 'dev';

  const authTypes = [
    {
      type: 'secret',
      secret: process.env.JWT_SECRET
    },
    {
      type: 'aad',
      identityMetadata: process.env.IDENTITY_METADATA,
      clientID: process.env.CLIENT_ID
    }
  ];

  const getAuthConfig = () => {
    const authType = process.env.AUTH_TYPE;
    const authConfig = authTypes.find((a) => a.type === authType);
    return authConfig;
  };

  return {
    loggerSettings: {
      levels: {
        info: 0,
        ok: 1,
        error: 2,
      },
      colors: {
        info: 'yellow',
        ok: 'green',
        error: 'red',
      },
    },
    hostingEnvironment: {
      env: process.env.NODE_ENV ? process.env.NODE_ENV : 'dev',
      host: process.env.HOST ? process.env.HOST : 'localhost',
      port: process.env.PORT ? process.env.PORT : 4432,
      protocol: isDev ? 'https' : 'http'
    },
    auth: getAuthConfig(),
    redis: {
      url: process.env.REDIS_URL ? process.env.REDIS_URL : ''
    }

  };
};

module.exports = renderConfig();