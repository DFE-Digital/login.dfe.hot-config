const { getAll } = require('../../infrastructure/services');
const { mapEntities } = require('../../../src/app/OIDCClients/data');

const getAllClients = async (req, res) => {
  const clients = await getAll();
  const map = await mapEntities(clients.services);
  res.send(map);
};

module.exports = getAllClients;
