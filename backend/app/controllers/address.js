const db = require('../models');

const create = async (req, res) => {
  const { address } = req.body;

  const validation = db.Address.schema.validate(address);

  if (!validation.error) {
    try {
      const dbaddress = await db.Address.create(address);

      const {
        createdAt, updatedAt, ...remaining
      } = dbaddress.dataValues;
      res.json({ address: { ...remaining } });
    } catch (err) {
      res.status(200).json({ error: err });
    }
  } else {
    res.status(200).json({ error: validation.error.details[0].message });
  }
};

const update = async (req, res) => {
  const { address } = req.body;

  const validation = db.Address.schema.validate(address);

  if (!validation.error) {
    try {
      const existing = await db.Address.findOne({
        attributes: ['id'],
        where: {
          id: address.id,
        },
      });
      if (existing !== null) {
        const dbaddress = await db.Address.update(
          address,
          { where: { id: address.id } },
        );
        res.json({ address: dbaddress });
      } else {
        res.json({ error: 'Address does not exist!' });
      }
    } catch (err) {
      res.status(200).json({ error: err });
    }
  } else {
    res.status(200).json({ error: validation.error });
  }
};

module.exports = {
  create,
  update,
};
