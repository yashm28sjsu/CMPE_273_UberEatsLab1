const db = require('../models');

const create = async (req, res) => {
  const user = req.body;
  console.log(user);

  const validation = db.User.schema.validate(user);

  if (!validation.error) {
    try {
      const existing = await db.User.findOne({
        attributes: ['id'],
        where: {
          email: user.email,
        },
      });
      console.log(`QUERY: ${existing}`);
      if (existing === null) {
        const dbuser = await db.User.create(user);
        console.log(dbuser);
        res.json(dbuser);
      } else {
        res.json({
          error:
            'Account already exists for this email address. Please verify and try again.',
        });
      }
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
