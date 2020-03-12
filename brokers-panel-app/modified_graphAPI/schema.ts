const { gql, UserInputError } = require("apollo-server");

import { Broker, Property } from "./entities";
import { RealEstateStore } from "./store";

const typeDefs = gql`
  type Broker {
    id: Int!
    name: String!
    address: String
  }

  input BrokerInput {
    name: String!
    address: String
  }

  input BrokerEdit {
    id: Int!
    name: String
    address: String
  }

  type Property {
    id: Int!
    broker: Broker!
    address: String!
    latitude: Float
    longitude: Float
    price: Int
    currency: String
  }

  input PropertyInput {
    brokerId: Int!
    address: String!
    latitude: Float
    longitude: Float
    price: Int
    currency: String
  }

  input PropertyEdit {
    id: Int!
    brokerId: Int
    address: String
    latitude: Float
    longitude: Float
    price: Int
    currency: String
  }

  type Query {
    brokers: [Broker]
    properties: [Property]
  }

  type Mutation {
    createBroker(brokerInput: BrokerInput!): Broker
    createProperty(propertyInput: PropertyInput!): Property
    modifyProperty(propertyFields: PropertyEdit!): Property
    deleteProperty(propertyID: Int!): [Property]
    editBroker(brokerFields: BrokerEdit!): Broker
  }
`;

const resolvers = {
  Query: {
    brokers: () => RealEstateStore.brokers,
    properties: () => RealEstateStore.properties
  },
  Mutation: {
    createBroker: (parent, { brokerInput }) => {
      const newBrokerId = RealEstateStore.brokers.length + 1;
      const newBroker: Broker = { id: newBrokerId, ...brokerInput };
      RealEstateStore.pushBroker(newBroker);
      return newBroker;
    },
    createProperty: (parent, { propertyInput }) => {
      const { brokerId } = propertyInput;
      const broker: Broker | undefined = RealEstateStore.brokers.find(
        broker => broker.id === brokerId
      );
      if (!broker) {
        throw new UserInputError("Invalid Broker ID, does not exists", {
          invalidArgs: { brokerId }
        });
      }
      const newpPropertyId = RealEstateStore.properties.length + 1;
      const newProperty: Property = {
        id: newpPropertyId,
        broker,
        ...propertyInput
      };
      RealEstateStore.pushProperty(newProperty);
      return newProperty;
    },
    modifyProperty: (parent, { propertyFields }) => {
      let existingProp = RealEstateStore.properties.find(
        prop => prop.id === propertyFields.id
      );
      if (!existingProp) {
        throw new UserInputError("Invalid Property ID, does not exists", {
          invalidArgs: { propertyFields }
        });
      }
      RealEstateStore.replaceProperty(propertyFields);
      return existingProp;
    },
    deleteProperty: (parent, { propertyID }) => {
      RealEstateStore.deleteProperty(propertyID);
      return RealEstateStore.properties;
    },
    editBroker: (parent, { brokerFields }) => {
      console.log(brokerFields);
      const existingBroker = RealEstateStore.brokers.find(
        broker => broker.id === brokerFields.id
      );
      if (!existingBroker) {
        throw new UserInputError("Invalid Broker ID, does not exists", {
          invalidArgs: { brokerFields }
        });
      } else {
        if (brokerFields.name === "" && brokerFields.address === "") {
          return existingBroker;
        }
        // const newBroker = {
        //   id: existingBroker.id,
        //   name: brokerFields.name === "" ? null : brokerFields.name,
        //   address: brokerFields.address === "" ? null : brokerFields.address
        // };
        return RealEstateStore.replaceBroker(brokerFields);
      }
    }
  }
};

export { typeDefs, resolvers };
