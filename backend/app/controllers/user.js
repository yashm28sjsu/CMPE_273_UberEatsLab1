const bcrypt = require('bcrypt');
const db = require('../models');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function comparePassword(password, hashedPassword) {
  const isSame = await bcrypt.compare(password, hashedPassword);
  return isSame;
}

const create = async (req, res) => {
  const user = req.body;
  console.log(user);

  const hash = await hashPassword(user.password);

  user.password = hash;
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

const update = async (req, res) => {
  const user = req.body;
  console.log(user);

  const validation = db.User.schema.validate(user);

  if (!validation.error) {
    try {
      const existing = await db.User.findOne({
        attributes: ['id'],
        where: {
          email: user.email,
          id: {
            [db.Sequelize.Op.not]: user.id,
          },
        },
      });
      console.log(`QUERY: ${existing}`);
      if (existing === null) {
        const dbuser = await db.User.update(
          user,
          { where: { id: user.id } },
        );
        console.log(dbuser);
        res.json(dbuser);
      } else {
        res.json({ error: 'Account already exists for this email address. Please verify and try again.' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({ err: validation.error });
  }
};

const login = async (req, res) => {
  const email = req.body.username;
  try {
    const existing = await db.User.findOne({
      attributes: ['password'],
      where: { email },
    });
    if (existing != null) {
      const match = await comparePassword(req.body.password, existing.password);
      if (match) {
        res.json({ success: true });
      } else {
        res.json({ error: 'Username and/or Password are not correct. please verify and try again.' });
      }
    } else {
      res.json({ error: 'User does not exist with given username.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  create,
  update,
  login,
};
