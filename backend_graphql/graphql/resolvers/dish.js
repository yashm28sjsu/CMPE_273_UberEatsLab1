const controller = require('../../controllers/dish');

const resolvers = {
    Query: {
        getDishes: async (_parent, args, _context, _info) => await controller.getDishes(args.restaurantId),
    },
    Mutation: {
        createDish: async (_parent, args, _context, _info) => await controller.create(args.dish),
        updateDish: async (_parent, args, _context, _info) => await controller.update(args.dish),
    },
};

module.exports = resolvers;
