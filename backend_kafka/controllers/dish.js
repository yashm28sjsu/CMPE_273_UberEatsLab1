const topics = require('../topics');

const { Dish, DishSchema } = require('../models/dish');

const create = async (dish, callback) => {
  const validation = DishSchema.validate(dish);

  if (!validation.error) {
    try {
      const dbdish = new Dish(dish);
      const saved = await dbdish.save();

      callback(null, { dish: saved.toJSON() });
    } catch (err) {
      callback({ error: err }, null);
    }
  } else {
    callback({ error: validation.error.details[0].message }, null);
  }
};

const update = async (dish, callback) => {
  console.log(dish);

  const validation = DishSchema.validate(dish);

  if (!validation.error) {
    try {
      const updated = await Dish.findOneAndUpdate(
        { _id: dish.id },
        dish,
        { new: true },
      ).exec();
      if (updated !== null) {
        callback(null, { dish: updated.toJSON() });
      } else {
        callback({ error: 'Dish does not exist!' }, null);
      }
    } catch (err) {
      console.log(err);
      callback({ error: err }, null);
    }
  } else {
    callback({ error: validation.error }, null);
  }
};

const getDishes = async (data, callback) => {
  const { restaurantId } = data;
  try {
    const dbdishes = await Dish.find({
      restaurantId,
    });
    callback(null, { dishes: dbdishes });
  } catch (error) {
    callback({ error }, null);
  }
};

const handleRequest = (topic, body, callback) => {
  switch (topic) {
    case topics.DISH_CREATE:
      create(body, callback);
      break;
    case topics.DISH_UPDATE:
      update(body, callback);
      break;
    case topics.RESTAURANT_GETDISHES:
      getDishes(body, callback);
      break;
    default:
      break;
  }
};

module.exports = {
  handleRequest,
};
