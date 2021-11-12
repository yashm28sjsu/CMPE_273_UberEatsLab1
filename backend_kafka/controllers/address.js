const topics = require('../topics');

const { Address, AddressSchema } = require('../models/address');

const create = async (address, callback) => {
  const validation = AddressSchema.validate(address);

  if (!validation.error) {
    try {
      const saved = await (new Address(address)).save();

      callback(null, { address: saved.toJSON() });
    } catch (err) {
      console.log(err);
      callback({ error: err }, null);
    }
  } else {
    callback({ error: validation.error.details[0].message }, null);
  }
};

const update = async (address, callback) => {
  const validation = AddressSchema.validate(address);

  if (!validation.error) {
    try {
      const saved = await Address.findOneAndUpdate(
        { _id: address.id },
        address,
        { new: true },
      ).exec();
      callback(null, { address: saved.toJSON() });
    } catch (err) {
      callback({ error: err }, null);
    }
  } else {
    callback({ error: validation.error }, null);
  }
};

const getAddresses = async (data, callback) => {
  const { userId } = data;
  try {
    const dbaddresses = await Address.find({
      userId,
    });
    callback(null, { addresses: dbaddresses });
  } catch (error) {
    callback({ error }, null);
  }
};

const handleRequest = (topic, body, callback) => {
  switch (topic) {
    case topics.ADDRESS_CREATE:
      create(body, callback);
      break;
    case topics.ADDRESS_UPDATE:
      update(body, callback);
      break;
    case topics.USER_GETADDRESSES:
      getAddresses(body, callback);
      break;
    default:
      break;
  }
};

module.exports = {
  handleRequest,
};
