const db = require('../models');

const create = async (req, res) => {
  const { order } = req.body;
  const { orderlineitems, ...orderdata } = order;

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
        await t.rollback();
        res.json({ error: validation.error.details[0].message });
      }

      // res.json({ order: { ...remaining } });
    } catch (err) {
      // await t.rollback();
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

module.exports = {
  create,
  updateStatus,
};
