const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const dbconfig = require('./config/config.json');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');


const main = async () => {
  await mongoose.connect(dbconfig.development.url, { maxPoolSize: 10 });
  console.log('Database Connected');

  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

};

main();
