jest.mock('./../../../src/infrastructure/config', () => {
  return {
    storage: {
      type: 'static',
    },
  };
});
jest.mock('./../../../src/infrastructure/storage');

const { getOIDCClients } = require('./../../../src/infrastructure/storage');
const getSingle = require('./../../../src/app/OIDCClients/getSingle');

const req = {
  header: () => 'correlation-id',
  params: {
    id: 'client1',
  },
};
const res = {
  send: jest.fn(),
  status: jest.fn(),
};

describe('when getting single OIDC client', () => {
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

    req.params.id = 'client1';

    res.send.mockReset().mockReturnValue(res);
    res.status.mockReset().mockReturnValue(res);
  });

  it('then it should send single client if found', async () => {
    await getSingle(req, res);

    expect(res.send.mock.calls).toHaveLength(1);
    expect(res.send.mock.calls[0][0]).toEqual({
      friendlyName: 'Client One',
      client_id: 'client1',
      client_secret: 'super-secret-string',
      redirect_uris: [
        'https://client.one.test/auth/cb'
      ],
      post_logout_redirect_uris: [
        'https://client.one.test/signout/complete'
      ],
    });
  });

  it('then it should send 404 if not found', async () => {
    req.params.id = 'client2';

    await getSingle(req, res);

    expect(res.status.mock.calls).toHaveLength(1);
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.send.mock.calls).toHaveLength(1);
  });

  it('then it should send 404 if no clients', async () => {
    getOIDCClients.mockReturnValue([]);

    await getSingle(req, res);

    expect(res.status.mock.calls).toHaveLength(1);
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.send.mock.calls).toHaveLength(1);
  });

  it('then it should send 404 if clients is null', async () => {
    getOIDCClients.mockReturnValue(null);

    await getSingle(req, res);

    expect(res.status.mock.calls).toHaveLength(1);
    expect(res.status.mock.calls[0][0]).toBe(404);
    expect(res.send.mock.calls).toHaveLength(1);
  });

  it('then it should send correlation id to storage', async () => {
    await getSingle(req, res);

    expect(getOIDCClients.mock.calls).toHaveLength(1);
    expect(getOIDCClients.mock.calls[0][0]).toBe('correlation-id');
  });
});
