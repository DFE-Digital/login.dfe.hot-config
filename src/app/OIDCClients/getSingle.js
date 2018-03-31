const { getOIDCClients } = require('../../infrastructure/storage');

const getSingle = async (req, res) => {
  const clients = await getOIDCClients(req.header('x-correlation-id'));
  const client = clients ? clients.find(c => c.client_id.toLowerCase() === req.params.id.toLowerCase()) : undefined;
  if (!client) {
    return res.status(404).send();
  }
  return res.send(client);
};

module.exports = getSingle;
