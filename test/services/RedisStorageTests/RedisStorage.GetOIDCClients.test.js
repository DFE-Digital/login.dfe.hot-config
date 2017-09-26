const expect = require('chai').expect;
const sinon = require('sinon');
const RedisMock = require('ioredis-mock').default;

const RedisStorage = require('../../src/RedisStorage/RedisService');
const clients = '[{"client_id": "foo", "client_secret": "bar", "redirect_uris": ["http://lvh.me/cb"]}]';

describe('When using redis storage service', () => {
  describe('then when I call GetOIDCClients', () => {
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
    it('the clients are retrieved from redis', () =>{
      redis.set('OIDCClients','[{}]');

      return redisStorage.GetOIDCClients().then((actual)=>{
        expect(actual).to.not.equal(undefined);
        expect(JSON.stringify(actual)).to.equal('[{}]');
      });
    });
    it('then null is returned if there is no data', () => {
      return redisStorage.GetOIDCClients().then((actual)=>{
        expect(actual).to.equal(null);
      });
    });
    it('then the json is parsed and returned', () => {
      redis.set('OIDCClients',clients);
      return redisStorage.GetOIDCClients().then((actual)=>{
        expect(actual).to.not.equal(null);
        expect(actual[0].client_id).to.equal('foo');
      });
    });
  });
});