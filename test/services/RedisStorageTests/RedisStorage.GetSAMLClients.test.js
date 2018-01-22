jest.mock('./../../../src/infrastructure/config', () => {
  return {
    storage: {
      params: {
        url: 'http://orgs.api.test',
      },
    },
  };
});

jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => {

  });
});
jest.mock('./../../../src/infrastructure/logger');

const clients = '[{"id":"foo","identifierUri":"https://unit.test/foo","returnUrls":["https://relying.party/"],"publicKeyId":"fookey"}]';

describe('When getting saml clients', () => {
  let RedisStorage;
  let logger;

  beforeEach(() => {
    jest.resetModules();
    logger = require('./../../../src/infrastructure/logger');
    logger.info = jest.fn().mockImplementation(() => {
    });
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
    RedisStorage = require('../../../src/infrastructure/storage/redis');


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
    RedisStorage = require('../../../src/infrastructure/storage/redis');

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
    RedisStorage = require('../../../src/infrastructure/storage/redis');

    const actual = await RedisStorage.getSAMLClients();

    expect(actual).not.toBeNull();
    expect(actual[0].id).toBe('foo');
    expect(actual[0].identifierUri).toBe('https://unit.test/foo');
    expect(actual[0].returnUrls.length).toBe(1);
    expect(actual[0].returnUrls[0]).toBe('https://relying.party/');
    expect(actual[0].publicKeyId).toBe('fookey');

  });
  it('then the logger records the correlationId', async () => {
    jest.doMock('ioredis', () => {
      return jest.fn().mockImplementation(() => {
        const RedisMock = require('ioredis-mock').default;
        const redisMock = new RedisMock();
        redisMock.set('SAMLClients', clients);
        return redisMock;
      });
    });

    RedisStorage = require('../../../src/infrastructure/storage/redis');
    await RedisStorage.getSAMLClients('12345');

    expect(logger.info.mock.calls).toHaveLength(1);
    expect(logger.info.mock.calls[0][0]).toBe('Getting SAMLClients for request id 12345');
  });
});