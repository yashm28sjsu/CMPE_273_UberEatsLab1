const controller = require('../../controllers/user');

const resolvers = {
    Query: {
        loginUser: async (_parent, args, _context, _info) => await controller.login(args.user),
    },
    Mutation: {
        createUser: async (_parent, args, _context, _info) => await controller.create(args.user),
        updateUser: async (_parent, args, _context, _info) => await controller.update(args.user),
    },
};

module.exports = resolvers;
