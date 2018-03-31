const { getOIDCClients } = require('../../infrastructure/storage');

const getAll = async (req, res) => {
  const clients = await getOIDCClients(req.header('x-correlation-id'));
  res.send(clients);
};

module.exports = getAll;
