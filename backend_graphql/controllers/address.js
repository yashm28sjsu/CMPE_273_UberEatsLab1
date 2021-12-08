const { Address, AddressSchema } = require('../models/address');

const create = async (address) => {
  const validation = AddressSchema.validate(address);

  if (!validation.error) {
    try {
      const saved = await (new Address(address)).save();

      return { address: saved.toJSON() };
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  } else {
    return { error: validation.error.details[0].message };
  }
};

const update = async (address) => {
  const validation = AddressSchema.validate(address);

  if (!validation.error) {
    try {
      const saved = await Address.findOneAndUpdate(
        { _id: address.id },
        address,
        { new: true },
      ).exec();
      return { address: saved.toJSON() };
    } catch (err) {
      return { error: err };
    }
  } else {
    return { error: validation.error };
  }
};

const getAddresses = async (data) => {
  const userId = data;
  try {
    const dbaddresses = await Address.find({
      userId,
    });
    return { addresses: dbaddresses };
  } catch (error) {
    return { error };
  }
};

module.exports = {
  create,
  update,
  getAddresses,
};
