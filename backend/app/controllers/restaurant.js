const db = require('../models');

const create = async (req, res) => {
  const restaurant = req.body;
  console.log(restaurant);

  const validation = db.Restaurant.schema.validate(restaurant);

  if (!validation.error) {
    try {
      const dbrestaurant = await db.Restaurant.create(restaurant);
      console.log(dbrestaurant);
      res.json(dbrestaurant);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({ err: validation.error });
  }
};

module.exports = {
  create,
};
