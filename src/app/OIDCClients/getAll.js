const { getAll } = require('../../infrastructure/services');

const getAllClients = async (req, res) => {
  const clients = await getAll();
  return res.send(clients);
};

module.exports = getAllClients;
