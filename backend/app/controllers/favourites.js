const db = require('../models');

const create = async (req, res) => {
  const { favourites } = req.body;

  const validation = db.Favourites.schema.validate(favourites);

  if (!validation.error) {
    try {
      const dbfavourites = await db.Favourites.create(favourites);

      const {
        createdAt, updatedAt, ...remaining
      } = dbfavourites.dataValues;
      res.json({ favourites: { ...remaining } });
    } catch (err) {
      res.status(200).json({ error: err });
    }
  } else {
    res.status(200).json({ error: validation.error.details[0].message });
  }
};

const remove = async (req, res) => {
  const { favourites } = req.body;

  if (!favourites.id != null && favourites.id) {
    try {
      const existing = await db.Favourites.findOne({
        attributes: ['id'],
        where: {
          id: favourites.id,
        },
      });
      if (existing !== null) {
        // eslint-disable-next-line no-unused-vars
        const dbfavourites = await db.Favourites.destroy(
          { where: { id: favourites.id } },
        );
        res.json({ success: true });
      } else {
        res.json({ error: 'Favourites does not exist!' });
      }
    } catch (err) {
      res.status(200).json({ error: err });
    }
  } else {
    res.status(200).json({ error: 'Invalid Id to delete...' });
  }
};

module.exports = {
  create,
  remove,
};
