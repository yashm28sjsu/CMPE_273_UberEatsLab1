const db = require('../models');

const create = async (req, res) => {
  const { order } = req.body;
  const { orderlineitems, ...orderdata } = order;
  console.log(req.body);
  const validation = db.Order.schema.validate(orderdata);
  if (!validation.error) {
    const t = await db.sequelize.transaction();
    try {
      const dborderdata = await db.Order.create(orderdata, { transaction: t });

      const {
        createdAt, updatedAt, ...remaining
      } = dborderdata.dataValues;

      const orderlineitemsdata = orderlineitems.map((line) => (
        { ...line, OrderId: dborderdata.id }
      ));

      console.log(orderlineitemsdata);

      const oliValidation = db.OrderLineItem.arraySchema.validate(orderlineitemsdata);

      if (!oliValidation.error) {
        // eslint-disable-next-line no-unused-vars
        const dborderlineitemdata = await db.OrderLineItem.bulkCreate(
          orderlineitemsdata, { transaction: t },
        );

        t.afterCommit(() => {
          res.json({ order: { ...remaining } });
        });

        await t.commit();
      } else {
        res.json({ error: oliValidation.error.details[0].message });
      }
    } catch (err) {
      await t.rollback();
      res.status(200).json({ error: err });
    }
  } else {
    res.status(200).json({ error: validation.error.details[0].message });
  }
};

const updateStatus = async (req, res) => {
  const { order } = req.body;

  const validation = db.Order.schema.validate(order);

  if (!validation.error) {
    try {
      const existing = await db.Order.findOne({
        attributes: ['id'],
        where: {
          id: order.id,
        },
      });
      if (existing !== null) {
        const dborder = await db.Order.update(
          { ...existing, status: order.status },
          { where: { id: order.id } },
        );
        res.json({ order: dborder });
      } else {
        res.json({ error: 'Order does not exist!' });
      }
    } catch (err) {
      res.status(200).json({ error: err });
    }
  } else {
    res.status(200).json({ error: validation.error });
  }
};

const getOrders = async (req, res) => {
  const { id } = req.body;
  try {
    const dborders = await db.Order.findAll({
      where: {
        UserId: parseInt(id, 10),
      },
      include: [
        { model: db.Address, attributes: ['id', 'address'] },
        { model: db.Restaurant, attributes: ['id', 'name'] },
        {
          model: db.OrderLineItem,
          as: 'orderlineitems',
          include: [
            { model: db.Dish },
          ],
        },
      ],
    });
    res.json({ orders: dborders });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  create,
  updateStatus,
  getOrders,
};
