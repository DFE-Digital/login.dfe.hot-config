const { getAll } = require('../../infrastructure/services');

const getAllClients = async (req, res) => {
  const clients = await getAll();
  res.send(clients);
};

module.exports = getAllClients;
