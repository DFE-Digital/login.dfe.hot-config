jest.mock('./../../../src/infrastructure/config', () => {
  return {
    storage: {
      type: 'static',
    },
  };
});
jest.mock('./../../../src/infrastructure/storage');

const { getOIDCClients } = require('./../../../src/infrastructure/storage');
const getAll = require('./../../../src/app/OIDCClients/getAll');

const req = {
  header: () => 'correlation-id',
};
const res = {
  send: jest.fn(),
};

describe('when getting all OIDC clients', () => {
  beforeEach(() => {
    getOIDCClients.mockReset().mockReturnValue([
      {
        friendlyName: 'Client One',
        client_id: 'client1',
        client_secret: 'super-secret-string',
        redirect_uris: [
          'https://client.one.test/auth/cb'
        ],
        post_logout_redirect_uris: [
          'https://client.one.test/signout/complete'
        ],
      },
    ]);

    res.send.mockReset();
  });

  it('then it should send all clients from storage', async () => {
    await getAll(req, res);

    expect(res.send.mock.calls).toHaveLength(1);
    expect(res.send.mock.calls[0][0]).toEqual([
      {
        friendlyName: 'Client One',
        client_id: 'client1',
        client_secret: 'super-secret-string',
        redirect_uris: [
          'https://client.one.test/auth/cb'
        ],
        post_logout_redirect_uris: [
          'https://client.one.test/signout/complete'
        ],
      },
    ]);
  });

  it('then it should send correlation id to storage', async () => {
    await getAll(req, res);

    expect(getOIDCClients.mock.calls).toHaveLength(1);
    expect(getOIDCClients.mock.calls[0][0]).toBe('correlation-id');
  });
});
