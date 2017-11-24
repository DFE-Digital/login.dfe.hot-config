jest.mock('./../../../src/infrastructure/config', () => {
  return {
    redis: {
      url: 'http://orgs.api.test',
    },
  };
});

jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => {

  });
});
const clients = '[{"id":"foo","identifierUri":"https://unit.test/foo","returnUrls":["https://relying.party/"],"publicKeyId":"fookey"}]';

describe('When getting saml clients', () => {
  let RedisStorage;

  beforeEach(() => {
    jest.resetModules();

  });
  it('then the clients are retrieved from redis', async () => {
    jest.doMock('ioredis', () => {
      return jest.fn().mockImplementation(() => {
        const RedisMock = require('ioredis-mock').default;
        const redisMock = new RedisMock();
        redisMock.set('SAMLClients', '[{}]');
        return redisMock;
      });
    });
    RedisStorage = require('./../../../src/infrastructure/RedisStorage/RedisService');


    const actual = await RedisStorage.getSAMLClients();

    expect(actual).not.toBe(undefined);
    expect(JSON.stringify(actual)).toBe('[{}]');
  });
  it('then null is returned if there is no data', async () => {
    jest.doMock('ioredis', () => {
      return jest.fn().mockImplementation(() => {
        const RedisMock = require('ioredis-mock').default;
        const redisMock = new RedisMock();
        redisMock.set('SAMLClients', '');
        return redisMock;
      });
    });
    RedisStorage = require('./../../../src/infrastructure/RedisStorage/RedisService');

    const actual = await RedisStorage.getSAMLClients();

    expect(actual).toBeNull();
  });
  it('then the json is parsed and returned', async () => {
    jest.doMock('ioredis', () => {
      return jest.fn().mockImplementation(() => {
        const RedisMock = require('ioredis-mock').default;
        const redisMock = new RedisMock();
        redisMock.set('SAMLClients', clients);
        return redisMock;
      });
    });
    RedisStorage = require('./../../../src/infrastructure/RedisStorage/RedisService');

    const actual = await RedisStorage.getSAMLClients();

    expect(actual).not.toBeNull();
    expect(actual[0].id).toBe('foo');
    expect(actual[0].identifierUri).toBe('https://unit.test/foo');
    expect(actual[0].returnUrls.length).toBe(1);
    expect(actual[0].returnUrls[0]).toBe('https://relying.party/');
    expect(actual[0].publicKeyId).toBe('fookey');

  });
});