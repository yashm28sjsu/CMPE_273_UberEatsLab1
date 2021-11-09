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

const create = async (data, callback) => {
  console.log(`${JSON.stringify(data)}`);

  const hash = await hashPassword(data.password);

  const user = { ...data, password: hash };
  const validation = UserSchema.validate(user);

  if (!validation.error) {
    try {
      const existing = await User.findOne({
        email: user.email,
      }).exec();
      console.log(`QUERY: ${existing}`);
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
            const { password, ...remaining } = user;
            // eslint-disable-next-line no-underscore-dangle
            callback(null, { user: { id: saved._id, ...remaining, type: 'USER' }, token });
          } else {
            console.log(error);
            callback({ error }, null);
          }
        });
      } else {
        callback({ error: 'Account already exists for this email address. Please verify and try again.' }, null);
      }
    } catch (err) {
      console.log(err);
      callback({ error: err }, null);
    }
  } else {
    callback({ error: validation.error.details[0].message }, null);
  }
};

// const update = async (req, res) => {
//   const user = req.body;
//   console.log(user);

//   const validation = db.User.schema.validate(user);

//   if (!validation.error) {
//     try {
//       const existing = await db.User.findOne({
//         attributes: ['id'],
//         where: {
//           email: user.email,
//           id: {
//             [db.Sequelize.Op.not]: user.id,
//           },
//         },
//       });
//       console.log(`QUERY: ${existing}`);
//       if (existing === null) {
//         const dbuser = await db.User.update(
//           user,
//           { where: { id: user.id } },
//         );
//         console.log(dbuser);
//         res.json(dbuser);
//       } else {
//         res.json({ error: 'Account already exists for this email address. Please verify and try again.' });
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(200).json({ error: err });
//     }
//   } else {
//     res.status(200).json({ error: validation.error });
//   }
// };

// const login = async (req, res) => {
//   const email = req.body.username;
//   try {
//     const existing = await db.User.findOne({
//       where: { email },
//     });
//     if (existing != null) {
//       const match = await comparePassword(req.body.password, existing.password);
//       if (match) {
//         const token = jwt.sign(
//           { id: existing.id },
//           secrets.access_token_secret,
//           { expiresIn: EXPIRATION_TIME },
//         );
//         const {
//           password,
//           createdAt,
//           updatedAt,
//           ...user
//         } = existing.dataValues;
//         res.json({ user: { ...user, type: 'USER' }, token });
//       } else {
//         res.json({ error: 'Username and/or Password are not correct. Please verify and try again.' });
//       }
//     } else {
//       res.json({ error: 'User does not exist with given Email Address.' });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(200).json({ error: err });
//   }
// };

const handleRequest = (topic, body, callback) => {
  switch (topic) {
    case topics.USER_CREATE:
      create(body, callback);
      break;
    // case topics.USER_UPDATE:
    //   update(body, callback);
    //   break;
    // case topics.USER_LOGIN:
    //   login(body, callback);
    //   break;
    default:
      break;
  }
}


module.exports = {
  handleRequest,
};
