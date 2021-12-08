const controller = require('../../controllers/favourite');

const resolvers = {
    Query: {
        getFavourites: async (_parent, args, _context, _info) => await controller.getFavourites(args.userId),
    },
    Mutation: {
        createFavourite: async (_parent, args, _context, _info) => await controller.create(args.favourite),
        deleteFavourite: async (_parent, args, _context, _info) => await controller.remove(args.favouriteId),
    },
};

module.exports = resolvers;
