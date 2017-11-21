const RedisMock = require('ioredis-mock').default;

const RedisStorage = require('../../../src/RedisStorage/RedisService');
const clients = '[{"client_id": "foo", "client_secret": "bar", "redirect_uris": ["http://lvh.me/cb"]}]';

describe('When getting oidc clients', () => {
  let redis;
  let redisStorage;

  beforeEach(() => {
    redis = new RedisMock();
    redisStorage = new RedisStorage(redis);
  });
  afterEach(() => {
  });
  it('then the clients are retrieved from redis', () => {
    redis.set('OIDCClients', '[{}]');

    return redisStorage.GetOIDCClients().then((actual) => {
      expect(actual).not.toBe(undefined);
      expect(JSON.stringify(actual)).toBe('[{}]');
    });
  });
  it('then null is returned if there is no data', () => {
    return redisStorage.GetOIDCClients().then((actual) => {
      expect(actual).toBeNull();
    });
  });
  it('then the json is parsed and returned', () => {
    redis.set('OIDCClients', clients);
    return redisStorage.GetOIDCClients().then((actual) => {
      expect(actual).not.toBeNull();
      expect(actual[0].client_id).toBe('foo');
    });
  });
});