const topics = require('../topics');

const { Favourite, FavouriteSchema } = require('../models/favourite');
const { Restaurant } = require('../models/restaurant');

const create = async (favourite, callback) => {
  const validation = FavouriteSchema.validate(favourite);

  if (!validation.error) {
    try {
      const saved = await (new Favourite(favourite)).save();

      callback(null, { favourite: saved.toJSON() });
    } catch (err) {
      callback({ error: err }, null);
    }
  } else {
    callback({ error: validation.error.details[0].message }, null);
  }
};

const remove = async (favourite, callback) => {
  if (!favourite.id != null && favourite.id) {
    try {
      const existing = await Favourite.findOne({
        _id: favourite.id,
      });
      if (existing !== null) {
        // eslint-disable-next-line no-unused-vars
        const dbfavourites = await Favourite.deleteOne({
          _id: favourite.id,
        });
        callback(null, { success: true });
      } else {
        callback({ error: 'Favourites does not exist!' }, null);
      }
    } catch (err) {
      callback({ error: err }, null);
    }
  } else {
    callback({ error: 'Invalid Id to delete...' }, null);
  }
};

const getFavourites = async (data, callback) => {
  const { userId } = data;
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
    callback(null, { favourites: favWithRestaurants });
  } catch (error) {
    console.log(error);
    callback({ error }, null);
  }
};

const handleRequest = (topic, body, callback) => {
  switch (topic) {
    case topics.FAVOURITE_CREATE:
      create(body, callback);
      break;
    case topics.FAVOURITE_REMOVE:
      remove(body, callback);
      break;
    case topics.USER_GETFAVOURITES:
      getFavourites(body, callback);
      break;
    default:
      break;
  }
};

module.exports = {
  handleRequest,
};
