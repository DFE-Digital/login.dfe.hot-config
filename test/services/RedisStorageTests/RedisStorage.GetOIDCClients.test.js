jest.mock('./../../../src/infrastructure/config', () => ({
  redis: {
    url: 'http://orgs.api.test',
  },
}));

jest.mock('ioredis', () => jest.fn().mockImplementation(() => {

}));


describe('When getting oidc clients', () => {
  let RedisStorage;

  beforeEach(() => {
    jest.resetModules();
  });
  it('then the clients are retrieved from redis', async () => {
    jest.doMock('ioredis', () => jest.fn().mockImplementation(() => {
      const RedisMock = require('ioredis-mock').default;
      const redisMock = new RedisMock();
      redisMock.set('OIDCClients', '[{}]');
      return redisMock;
    }));
    RedisStorage = require('./../../../src/infrastructure/RedisStorage/RedisService');
    const actual = await RedisStorage.getOIDCClients();

    expect(actual).not.toBe(undefined);
    expect(JSON.stringify(actual)).toBe('[{}]');
  });
  it('then null is returned if there is no data', async () => {
    jest.doMock('ioredis', () => jest.fn().mockImplementation(() => {
      const RedisMock = require('ioredis-mock').default;
      const redisMock = new RedisMock();
      redisMock.set('OIDCClients', '');
      return redisMock;
    }));
    RedisStorage = require('./../../../src/infrastructure/RedisStorage/RedisService');
    const actual = await RedisStorage.getOIDCClients();

    expect(actual).toBeNull();
  });
  it('then the json is parsed and returned', async () => {
    jest.doMock('ioredis', () => jest.fn().mockImplementation(() => {
      const RedisMock = require('ioredis-mock').default;
      const redisMock = new RedisMock();
      redisMock.set('OIDCClients', '[{"client_id": "foo", "client_secret": "bar", "redirect_uris": ["http://lvh.me/cb"]}]');
      return redisMock;
    }));

    RedisStorage = require('./../../../src/infrastructure/RedisStorage/RedisService');
    const actual = await RedisStorage.getOIDCClients();

    expect(actual).not.toBeNull();
    expect(actual[0].client_id).toBe('foo');
  });
});
