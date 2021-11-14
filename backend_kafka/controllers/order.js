const topics = require('../topics');

const { Order, OrderSchema } = require('../models/order');
const { Restaurant } = require('../models/restaurant');
const { Dish } = require('../models/dish');
const { Address } = require('../models/address');
const { User } = require('../models/user');

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
    }).sort({ _id: 1 });
    const dborders = dbo.map((x) => x.toJSON());
    const restaurantIds = dborders.map((order) => order.restaurantId);
    const dbrest = await Restaurant.find({
      _id: { $in: restaurantIds },
    }).exec();
    const dbrestaurants = dbrest.map((x) => x.toJSON());
    // eslint-disable-next-line no-shadow
    const ordersWithR = dborders.map(({ restaurantId, ...order }) => ({
      ...order,
      // eslint-disable-next-line no-underscore-dangle
      restaurant: dbrestaurants.filter((rest) => rest._id.toString() === restaurantId)[0],
    }));
    const dishIds = [];
    ordersWithR.forEach((order) => {
      order.lineitems.forEach((line) => dishIds.push(line.dishId));
    });
    const dbd = await Dish.find({
      _id: { $in: dishIds },
    }).exec();
    const dbdishes = dbd.map((x) => x.toJSON());
    const ordersWithRD = ordersWithR.map(
      ({ lineitems, ...order }) => ({
        ...order,
        lineitems: lineitems.map(({ dishId, ...line }) => ({
          ...line,
          // eslint-disable-next-line no-underscore-dangle
          dish: dbdishes.filter((dish) => dish._id.toString() === dishId)[0],
        })),
      }),
    );
    const addressIds = dborders.map((order) => order.addressId);
    const dbadd = await Address.find({
      _id: { $in: addressIds },
    }).exec();
    const dbaddresses = dbadd.map((x) => x.toJSON());
    // eslint-disable-next-line no-shadow
    const ordersWithRDA = ordersWithRD.map(({ addressId, ...order }) => ({
      ...order,
      // eslint-disable-next-line no-underscore-dangle
      address: dbaddresses.filter((add) => add._id.toString() === addressId)[0],
    }));
    callback(null, { orders: ordersWithRDA });
  } catch (error) {
    callback({ error }, null);
  }
};

const getRestaurantOrders = async (data, callback) => {
  const { restaurantId } = data;
  try {
    const dbo = await Order.find({
      restaurantId,
    }).sort({ _id: 1 });
    const dborders = dbo.map((x) => x.toJSON());
    const userIds = dborders.map((order) => order.userId);
    const dbu = await User.find({
      _id: { $in: userIds },
    }).exec();
    const dbusers = dbu.map((x) => x.toJSON());
    // eslint-disable-next-line no-shadow
    const ordersWithU = dborders.map(({ userId, ...order }) => ({
      ...order,
      // eslint-disable-next-line no-underscore-dangle
      user: dbusers.filter((user) => user._id.toString() === userId)[0],
    }));
    const dishIds = [];
    ordersWithU.forEach((order) => {
      order.lineitems.forEach((line) => dishIds.push(line.dishId));
    });
    const dbd = await Dish.find({
      _id: { $in: dishIds },
    }).exec();
    const dbdishes = dbd.map((x) => x.toJSON());
    const ordersWithUD = ordersWithU.map(
      ({ lineitems, ...order }) => ({
        ...order,
        lineitems: lineitems.map(({ dishId, ...line }) => ({
          ...line,
          // eslint-disable-next-line no-underscore-dangle
          dish: dbdishes.filter((dish) => dish._id.toString() === dishId)[0],
        })),
      }),
    );
    const addressIds = dborders.map((order) => order.addressId);
    const dbadd = await Address.find({
      _id: { $in: addressIds },
    }).exec();
    const dbaddresses = dbadd.map((x) => x.toJSON());
    // eslint-disable-next-line no-shadow
    const ordersWithUDA = ordersWithUD.map(({ addressId, ...order }) => ({
      ...order,
      // eslint-disable-next-line no-underscore-dangle
      address: dbaddresses.filter((add) => add._id.toString() === addressId)[0],
    }));
    callback(null, { orders: ordersWithUDA });
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
