const { getByID } = require('../../infrastructure/services');

const getSingle = async (req, res) => {
  const client = await getByID(req.params.id);
  if (!client) {
    return res.status(404).send();
  }
  return res.send(client);
};

module.exports = getSingle;
