const controller = require('../../controllers/restaurant');

const resolvers = {
    Query: {
        loginRestaurant: async (_parent, args, _context, _info) => await controller.login(args.user),
        getAllRestaurants: async (_parent, _args, _context, _info) => await controller.getAll(),
    },
    Mutation: {
        createRestaurant: async (_parent, args, _context, _info) => await controller.create(args.user),
        updateRestaurant: async (_parent, args, _context, _info) => await controller.update(args.user),
    },
};

module.exports = resolvers;
