const expect = require('chai').expect;
const sinon = require('sinon');
const RedisMock = require('ioredis-mock').default;

const RedisStorage = require('../../../src/RedisStorage/RedisService');
const clients = '[{"id":"foo","identifierUri":"https://unit.test/foo","returnUrls":["https://relying.party/"],"publicKeyId":"fookey"}]';

describe('When getting saml clients', () => {
  let redis;
  let sandbox;
  let redisStorage;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    redis = new RedisMock();
    redisStorage = new RedisStorage(redis);
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('then the clients are retrieved from redis', () => {
    redis.set('SAMLClients', '[{}]');

    return redisStorage.GetSAMLClients().then((actual) => {
      expect(actual).to.not.equal(undefined);
      expect(JSON.stringify(actual)).to.equal('[{}]');
    });
  });
  it('then null is returned if there is no data', () => {
    return redisStorage.GetSAMLClients().then((actual) => {
      expect(actual).to.equal(null);
    });
  });
  it('then the json is parsed and returned', () => {
    redis.set('SAMLClients', clients);
    return redisStorage.GetSAMLClients().then((actual) => {
      expect(actual).to.not.equal(null);
      expect(actual[0].id).to.equal('foo');
      expect(actual[0].identifierUri).to.equal('https://unit.test/foo');
      expect(actual[0].returnUrls.length).to.equal(1);
      expect(actual[0].returnUrls[0]).to.equal('https://relying.party/');
      expect(actual[0].publicKeyId).to.equal('fookey');
    });
  });
});