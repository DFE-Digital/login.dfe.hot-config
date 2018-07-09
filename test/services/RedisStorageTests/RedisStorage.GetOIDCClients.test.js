jest.mock('./../../../src/infrastructure/config', () => ({
  storage: {
    params: {
      url: 'http://orgs.api.test',
    },
  },
}));

jest.mock('ioredis', () => jest.fn().mockImplementation(() => {

}));
jest.mock('./../../../src/infrastructure/logger', () => {
  return {
    info: jest.fn(),
  };
});

describe('When getting oidc clients', () => {
  let RedisStorage;
  let logger;


  beforeEach(() => {
    jest.resetModules();
    logger = require('./../../../src/infrastructure/logger');
    logger.info = jest.fn().mockImplementation(() => {
    });
  });
  it('then the clients are retrieved from redis', async () => {
    jest.doMock('ioredis', () => jest.fn().mockImplementation(() => {
      const RedisMock = require('ioredis-mock');
      const redisMock = new RedisMock();
      redisMock.set('OIDCClients', '[{}]');
      return redisMock;
    }));
    RedisStorage = require('../../../src/infrastructure/storage/redis');
    const actual = await RedisStorage.getOIDCClients();

    expect(actual).not.toBe(undefined);
    expect(JSON.stringify(actual)).toBe('[{}]');
  });
  it('then null is returned if there is no data', async () => {
    jest.doMock('ioredis', () => jest.fn().mockImplementation(() => {
      const RedisMock = require('ioredis-mock');
      const redisMock = new RedisMock();
      redisMock.set('OIDCClients', '');
      return redisMock;
    }));
    RedisStorage = require('../../../src/infrastructure/storage/redis');
    const actual = await RedisStorage.getOIDCClients();

    expect(actual).toBeNull();
  });
  it('then the json is parsed and returned', async () => {
    jest.doMock('ioredis', () => jest.fn().mockImplementation(() => {
      const RedisMock = require('ioredis-mock');
      const redisMock = new RedisMock();
      redisMock.set('OIDCClients', '[{"client_id": "foo", "client_secret": "bar", "redirect_uris": ["http://lvh.me/cb"]}]');
      return redisMock;
    }));

    RedisStorage = require('../../../src/infrastructure/storage/redis');
    const actual = await RedisStorage.getOIDCClients();

    expect(actual).not.toBeNull();
    expect(actual[0].client_id).toBe('foo');
  });
  it('then the logger records the correlationId', async () => {
    jest.doMock('ioredis', () => jest.fn().mockImplementation(() => {
      const RedisMock = require('ioredis-mock');
      const redisMock = new RedisMock();
      redisMock.set('OIDCClients', '[{"client_id": "foo", "client_secret": "bar", "redirect_uris": ["http://lvh.me/cb"]}]');
      return redisMock;
    }));

    RedisStorage = require('../../../src/infrastructure/storage/redis');
    await RedisStorage.getOIDCClients('12345');

    expect(logger.info.mock.calls).toHaveLength(1);
    expect(logger.info.mock.calls[0][0]).toBe('Getting OIDCClients for request id 12345');
  });
});
