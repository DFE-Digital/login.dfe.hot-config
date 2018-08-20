const { getAll } = require('../../infrastructure/services');

const mapEntity = async (entity) => {
  if (!entity) {
    return undefined;
  }
  return {
    friendlyName: entity.name,
    client_id: entity.relyingParty.client_id,
    client_secret: entity.relyingParty.client_secret,
    api_secret: entity.relyingParty.api_secret || undefined,
    redirect_uris: entity.relyingParty.redirect_uris,
    post_logout_redirect_uris: entity.relyingParty.post_logout_redirect_uris,
    params: entity.relyingParty.params,
  };
};

const mapEntities = async (entities) => {
  const mapped = [];
  for (let i = 0; i < entities.length; i++) {
    mapped.push(await mapEntity(entities[i]));
  }
  return mapped;
};

const getAllClients = async (req, res) => {
  const clients = await getAll();
  const map = await mapEntities(clients.services);
  res.send(map);
};

module.exports = getAllClients;
