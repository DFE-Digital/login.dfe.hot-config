const RedisMock = require('ioredis-mock').default;

const RedisStorage = require('./../../../src/infrastructure/RedisStorage/RedisService');
const clients = '[{"id":"foo","identifierUri":"https://unit.test/foo","returnUrls":["https://relying.party/"],"publicKeyId":"fookey"}]';

describe('When getting saml clients', () => {
  let redis;
  let redisStorage;

  beforeEach(() => {
    redis = new RedisMock();
    redisStorage = new RedisStorage(redis);
  });
  it('then the clients are retrieved from redis', () => {
    redis.set('SAMLClients', '[{}]');

    return redisStorage.GetSAMLClients().then((actual) => {
      expect(actual).not.toBe(undefined);
      expect(JSON.stringify(actual)).toBe('[{}]');
    });
  });
  it('then null is returned if there is no data', () => {
    return redisStorage.GetSAMLClients().then((actual) => {
      expect(actual).toBeNull();
    });
  });
  it('then the json is parsed and returned', () => {
    redis.set('SAMLClients', clients);
    return redisStorage.GetSAMLClients().then((actual) => {
      expect(actual).not.toBeNull();
      expect(actual[0].id).toBe('foo');
      expect(actual[0].identifierUri).toBe('https://unit.test/foo');
      expect(actual[0].returnUrls.length).toBe(1);
      expect(actual[0].returnUrls[0]).toBe('https://relying.party/');
      expect(actual[0].publicKeyId).toBe('fookey');
    });
  });
});