const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('../config/access.json');
const topics = require('../topics');

const { User, UserSchema } = require('../models/user');

const EXPIRATION_TIME = '1h';

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

async function comparePassword(password, hashedPassword) {
  const isSame = await bcrypt.compare(password, hashedPassword);
  return isSame;
}

const create = async (data, callback) => {
  const hash = await hashPassword(data.password);

  const user = { ...data, password: hash };
  const validation = UserSchema.validate(user);

  if (!validation.error) {
    try {
      const existing = await User.findOne({
        email: user.email,
      }).exec();
      if (existing === null) {
        const dbuser = new User(user);
        dbuser.save((error, saved) => {
          if (!error) {
            console.log(saved);
            const token = jwt.sign(
              // eslint-disable-next-line no-underscore-dangle
              { id: saved._id },
              secrets.access_token_secret,
              { expiresIn: EXPIRATION_TIME },
            );
            const { password, ...remaining } = saved.toJSON();
            // eslint-disable-next-line no-underscore-dangle
            callback(null, { user: { ...remaining, type: 'USER' }, token });
          } else {
            callback({ error }, null);
          }
        });
      } else {
        callback({ error: 'Account already exists for this email address. Please verify and try again.' }, null);
      }
    } catch (err) {
      callback({ error: err }, null);
    }
  } else {
    callback({ error: validation.error.details[0].message }, null);
  }
};

const update = async (user, callback) => {
  // TODO: CHECK FOR EMAIL UPDATE DUPLICATION
  console.log(user);

  const validation = UserSchema.validate(user);

  if (!validation.error) {
    try {
      User.findOneAndUpdate(
        { _id: user.id },
        user,
        { new: true },
        (error, updated) => {
          if (!error) {
            const { password, ...remaining } = updated.toJSON();
            callback(null, remaining);
          } else {
            callback(
              {
                error: 'Account already exists for this email address. Please verify and try again.'
              },
              null,
            );
          }
        },
      );
    } catch (err) {
      console.log(err);
      callback({ error: err }, null);
    }
  } else {
    callback({ error: validation.error }, null);
  }
};

const login = async (user, callback) => {
  const email = user.username;
  try {
    const existing = await User.findOne({
      email,
    }).exec();
    if (existing != null) {
      const match = await comparePassword(user.password, existing.password);
      if (match) {
        const token = jwt.sign(
          { id: existing.id },
          secrets.access_token_secret,
          { expiresIn: EXPIRATION_TIME },
        );
        console.log (JSON.stringify(existing));
        const {
          password,
          ...dbuser
        } = existing.toJSON();
        callback(null, { user: { ...dbuser, type: 'USER' }, token });
      } else {
        callback({ error: 'Username and/or Password are not correct. Please verify and try again.' }, null);
      }
    } else {
      callback({ error: 'User does not exist with given Email Address.' }, null);
    }
  } catch (err) {
    console.log(err);
    callback({ error: err }, null);
  }
};

const handleRequest = (topic, body, callback) => {
  switch (topic) {
    case topics.USER_CREATE:
      create(body, callback);
      break;
    case topics.USER_UPDATE:
      update(body, callback);
      break;
    case topics.USER_LOGIN:
      login(body, callback);
      break;
    default:
      break;
  }
};

module.exports = {
  handleRequest,
};
