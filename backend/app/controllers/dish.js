const db = require('../models');

const create = async (req, res) => {
  const { dish } = req.body;

  const validation = db.Dish.schema.validate(dish);

  if (!validation.error) {
    try {
      const dbdish = await db.Dish.create(dish);

      const {
        createdAt, updatedAt, ...remaining
      } = dbdish.dataValues;
      res.json({ dish: { ...remaining } });
    } catch (err) {
      res.status(200).json({ error: err });
    }
  } else {
    res.status(200).json({ error: validation.error.details[0].message });
  }
};

const update = async (req, res) => {
  const { dish } = req.body;
  console.log(dish);

  const validation = db.Dish.schema.validate(dish);

  if (!validation.error) {
    try {
      const existing = await db.Dish.findOne({
        attributes: ['id'],
        where: {
          id: dish.id,
        },
      });
      if (existing !== null) {
        const dbdish = await db.Dish.update(
          dish,
          { where: { id: dish.id } },
        );
        res.json({ dish: dbdish });
      } else {
        res.json({ error: 'Dish does not exist!' });
      }
    } catch (err) {
      console.log(err);
      res.status(200).json({ error: err });
    }
  } else {
    res.status(200).json({ error: validation.error });
  }
};

const getDishes = async (req, res) => {
  const { restaurantid } = req.params;
  try {
    const dbdishes = await db.Dish.findAll({
      where: {
        RestaurantId: parseInt(restaurantid, 10),
      },
    });
    res.json({ dishes: dbdishes });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  create,
  update,
  getDishes,
};
