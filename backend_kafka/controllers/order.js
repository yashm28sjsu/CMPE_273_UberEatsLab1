const topics = require('../topics');

const { Order, OrderSchema } = require('../models/order');
const { Restaurant } = require('../models/restaurant');

const create = async (order, callback) => {
  console.log(order);
  const validation = OrderSchema.validate(order);
  if (!validation.error) {
    try {
      const dborder = await new Order(order);
      const saved = await dborder.save();

      callback(null, { order: saved.toJSON() });
    } catch (err) {
      console.log(err);
      callback({ error: err }, null);
    }
  } else {
    callback({ error: validation.error.details[0].message }, null);
  }
};

const updateStatus = async (order, callback) => {
  const valid = ['PLACED', 'ACCEPTED', 'COOKING', 'PICKEDUP', 'DELIVERED', 'CANCELLED'];
  if (order.status != null || !valid.includes(order.status)) {
    try {
      const dborder = await Order.findOneAndUpdate(
        { _id: order.id },
        { status: order.status },
        { new: true },
      ).exec();
      callback(null, { order: dborder.toJSON() });
    } catch (err) {
      callback({ error: err }, null);
    }
  } else {
    callback({ error: 'Invalid Status' }, null);
  }
};

const getOrders = async (data, callback) => {
  const { userId } = data;
  try {
    const dbo = await Order.find({
      userId,
    });
    const dborders = dbo.map((x) => x.toJSON());
    const restaurantIds = dborders.map((order) => order.restaurantId);
    const dbrest = await Restaurant.find({
      _id: { $in: restaurantIds },
    }).exec();
    const dbrestaurants = dbrest.map((x) => x.toJSON());
    // eslint-disable-next-line no-shadow
    const ordersWithRestaurants = dborders.map(({ restaurantId, ...fav }) => ({
      ...fav,
      // eslint-disable-next-line no-underscore-dangle
      restaurant: dbrestaurants.filter((rest) => rest._id.toString() === restaurantId)[0],
    }));
    callback(null, { orders: ordersWithRestaurants });
  } catch (error) {
    callback({ error }, null);
  }
};

const getRestaurantOrders = async (data, callback) => {
  const { restaurantId } = data;
  try {
    const dbo = await Order.find({
      restaurantId,
    });
    const dborders = dbo.map((x) => x.toJSON());
    const restaurantIds = dborders.map((order) => order.restaurantId);
    const dbrest = await Restaurant.find({
      _id: { $in: restaurantIds },
    }).exec();
    const dbrestaurants = dbrest.map((x) => x.toJSON());
    // eslint-disable-next-line no-shadow
    const ordersWithRestaurants = dborders.map(({ restaurantId, ...fav }) => ({
      ...fav,
      // eslint-disable-next-line no-underscore-dangle
      restaurant: dbrestaurants.filter((rest) => rest._id.toString() === restaurantId)[0],
    }));
    callback(null, { orders: ordersWithRestaurants });
  } catch (error) {
    callback({ error }, null);
  }
};

const handleRequest = (topic, body, callback) => {
  switch (topic) {
    case topics.ORDER_CREATE:
      create(body, callback);
      break;
    case topics.ORDER_UPDATESTATUS:
      updateStatus(body, callback);
      break;
    case topics.USER_GETORDERS:
      getOrders(body, callback);
      break;
    case topics.RESTAURANT_GETORDERS:
      getRestaurantOrders(body, callback);
      break;
    default:
      break;
  }
};

module.exports = {
  handleRequest,
};
