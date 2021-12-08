const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('../config/access.json');

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

const create = async (data) => {
  const hash = await hashPassword(data.password);

  const user = { ...data, password: hash };
  const validation = UserSchema.validate(user);

  if (!validation.error) {
    try {
      const existing = await User.findOne({
        email: user.email,
      }).exec();
      if (existing === null) {
        console.log("rest");
        const dbuser = new User(user);
        const saved = await dbuser.save();
        const token = jwt.sign(
          // eslint-disable-next-line no-underscore-dangle
          { id: saved._id },
          secrets.access_token_secret,
          { expiresIn: EXPIRATION_TIME },
        );
        console.log("rest");
        const { password, __v, ...remaining } = saved.toJSON();
        // eslint-disable-next-line no-underscore-dangle
        return { user: { ...remaining, type: 'USER' }, token };
      } else {
        return { error: 'Account already exists for this email address. Please verify and try again.' };
      }
    } catch (err) {
      return { error: err };
    }
  } else {
    return { error: validation.error.details[0].message };
  }
};

const update = async (user) => {
  // TODO: CHECK FOR EMAIL UPDATE DUPLICATION
  console.log(user);

  // const validation = UserSchema.validate(user);

  //if (!validation.error) {
  try {
    const updated = await User.findOneAndUpdate(
      { _id: user.id },
      user,
      { new: true }
    );
    const { password, ...remaining } = updated.toJSON();
    return { user: remaining };
  } catch (err) {
    console.log(err);
    return { error: err };
  }
  // } else {
  //   return { error: validation.error };
  //}
};

const login = async (user) => {
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
        console.log(JSON.stringify(existing));
        const {
          password,
          ...dbuser
        } = existing.toJSON();
        console.log({ user: { ...dbuser, type: 'USER' }, token });
        return { user: { ...dbuser, type: 'USER' }, token };
      } else {
        return { error: 'Username and/or Password are not correct. Please verify and try again.' };
      }
    } else {
      return { error: 'User does not exist with given Email Address.' };
    }
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

module.exports = {
  create,
  update,
  login,
};
