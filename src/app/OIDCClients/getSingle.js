const { getById } = require('../../infrastructure/applications');
const { mapEntity } = require('../../../src/app/OIDCClients/data');

const getSingle = async (req, res) => {
  const client = await getById(req.params.id);
  if (!client) {
    return res.status(404).send();
  }
  const entity = await mapEntity(client);
  return res.send(entity);
};

module.exports = getSingle;
