const { getById } = require('../../infrastructure/services');

const getSingle = async (req, res) => {
  const client = await getById(req.params.id);
  if (!client) {
    return res.status(404).send();
  }
  const entity = {
    friendlyName: client.name,
    client_id: client.relyingParty.client_id,
    client_secret: client.relyingParty.client_secret,
    api_secret: client.relyingParty.api_secret || undefined,
    redirect_uris: client.relyingParty.redirect_uris,
    post_logout_redirect_uris: client.relyingParty.post_logout_redirect_uris,
    params: client.relyingParty.params,
  };
  return res.send(entity);
};

module.exports = getSingle;
