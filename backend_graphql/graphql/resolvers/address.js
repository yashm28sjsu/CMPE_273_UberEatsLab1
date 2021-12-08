const controller = require('../../controllers/address');

const resolvers = {
    Query: {
        getAddresses: async (_parent, args, _context, _info) => await controller.getAddresses(args.userId),
    },
    Mutation: {
        createAddress: async (_parent, args, _context, _info) => await controller.create(args.address),
        updateAddress: async (_parent, args, _context, _info) => await controller.update(args.address),
    },
};

module.exports = resolvers;
