jest.mock('./../../../src/infrastructure/config', () => {
  return {
    storage: {
      type: 'static',
    },
    applications: {
      type: 'static',
    },
  };
});

jest.mock('./../../../src/infrastructure/services');
jest.mock('./../../../src/app/OIDCClients/data', () => {
  return {
    mapEntities: jest.fn().mockReturnValue([
      {
        friendlyName: 'Client One',
        client_id: 'client1',
        client_secret: 'super-secret-string',
        redirect_uris: [
          'https://client.one.test/auth/cb',
        ],
        post_logout_redirect_uris: [
          'https://client.one.test/signout/complete',
        ],
      },
    ]),
  };
});

const { getAll } = require('./../../../src/infrastructure/services');
const getAllClients = require('./../../../src/app/OIDCClients/getAll');

const req = {
  header: () => 'correlation-id',
};
const res = {
  send: jest.fn(),
};

describe('when getting all OIDC clients', () => {
  beforeEach(() => {
    getAll.mockReset().mockReturnValue([
      {
        friendlyName: 'Client One',
        client_id: 'client1',
        client_secret: 'super-secret-string',
        redirect_uris: [
          'https://client.one.test/auth/cb',
        ],
        post_logout_redirect_uris: [
          'https://client.one.test/signout/complete',
        ],
      },
    ]);

    res.send.mockReset();
  });

  it('then it should send all clients from storage', async () => {
    await getAllClients(req, res);

    expect(res.send.mock.calls).toHaveLength(1);
    expect(res.send.mock.calls[0][0]).toEqual([
      {
        friendlyName: 'Client One',
        client_id: 'client1',
        client_secret: 'super-secret-string',
        redirect_uris: [
          'https://client.one.test/auth/cb',
        ],
        post_logout_redirect_uris: [
          'https://client.one.test/signout/complete',
        ],
      },
    ]);
  });
});
