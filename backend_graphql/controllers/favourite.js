const { Favourite, FavouriteSchema } = require('../models/favourite');
const { Restaurant } = require('../models/restaurant');

const create = async (favourite) => {
  const validation = FavouriteSchema.validate(favourite);

  if (!validation.error) {
    try {
      const saved = await (new Favourite(favourite)).save();

      return { favourite: saved.toJSON() };
    } catch (err) {
      return { error: err };
    }
  } else {
    return { error: validation.error.details[0].message };
  }
};

const remove = async (favourite) => {
  if (!favourite != null && favourite) {
    try {
      const existing = await Favourite.findOne({
        _id: favourite,
      });
      if (existing !== null) {
        // eslint-disable-next-line no-unused-vars
        const dbfavourites = await Favourite.deleteOne({
          _id: favourite,
        });
        return { success: true };
      } else {
        return { error: 'Favourites does not exist!' };
      }
    } catch (err) {
      return { error: err };
    }
  } else {
    return { error: 'Invalid Id to delete...' };
  }
};

const getFavourites = async (data) => {
  const userId = data;
  try {
    const dbfav = await Favourite.find({
      userId,
    }).exec();
    const dbfavourites = dbfav.map((x) => x.toJSON());
    const restaurantIds = dbfavourites.map((fav) => fav.restaurantId);
    const dbrest = await Restaurant.find({
      _id: { $in: restaurantIds },
    }).exec();
    const dbrestaurants = dbrest.map((x) => x.toJSON());
    // eslint-disable-next-line no-shadow
    const favWithRestaurants = dbfavourites.map(({ restaurantId, userId, ...fav }) => ({
      ...fav,
      // eslint-disable-next-line no-underscore-dangle
      restaurant: dbrestaurants.filter((rest) => rest._id.toString() === restaurantId)[0],
    }));
    return { favourites: favWithRestaurants };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = {
  create,
  remove,
  getFavourites,
};
