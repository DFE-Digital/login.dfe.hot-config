const { getById } = require('../../infrastructure/services');

const getSingle = async (req, res) => {
  const client = await getById(req.params.id);
  if (!client) {
    return res.status(404).send();
  }
  return res.send(client);
};

module.exports = getSingle;
