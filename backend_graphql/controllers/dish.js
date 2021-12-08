const { Dish, DishSchema } = require('../models/dish');

const create = async (dish) => {
  const validation = DishSchema.validate(dish);

  if (!validation.error) {
    try {
      const dbdish = new Dish(dish);
      const saved = await dbdish.save();

      return { dish: saved.toJSON() };
    } catch (err) {
      return { error: err };
    }
  } else {
    return { error: validation.error.details[0].message };
  }
};

const update = async (dish) => {
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
        return { dish: updated.toJSON() };
      } else {
        return { error: 'Dish does not exist!' };
      }
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  } else {
    return { error: validation.error };
  }
};

const getDishes = async (data) => {
  const restaurantId = data;
  try {
    const dbdishes = await Dish.find({
      restaurantId,
    });
    return { dishes: dbdishes };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  create,
  update,
  getDishes,
};
