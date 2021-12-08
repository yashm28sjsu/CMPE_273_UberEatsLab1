const { gql } = require('apollo-server');

const typeDefs = gql`
    type Address {
        _id: String
        name: String
        userId: String
        address: String
    }
    type AddressResponse {
        address: Address
        error: String
    }
    type AddressArray {
        addresses: [Address]
        error: String
    }
    input AddressInput {
        id: String
        name: String
        userId: String
        address: String
    }
    type Query {
        getAddresses(userId: String): AddressArray
    }
    type Mutation {
        createAddress(address: AddressInput): AddressResponse
        updateAddress(address: AddressInput): AddressResponse
    }
`;

module.exports = typeDefs;
