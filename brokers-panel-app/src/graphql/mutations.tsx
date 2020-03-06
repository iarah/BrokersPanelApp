import { gql } from "apollo-boost";

export const ADD_BROKER = gql`
  mutation createBroker($input: BrokerInput!) {
    createBroker(brokerInput: $input) {
      id
      name
      address
    }
  }
`;

export const ADD_PROPERTY = gql`
  mutation createProperty($myVar: PropertyInput!) {
    createProperty(propertyInput: $myVar) {
      id
      address
      latitude
      longitude
      price
      currency
      broker {
        name
      }
    }
  }
`;

export const UPDATE_PROPERTY = gql`
  mutation editarPropiedad($nuevosCampos: PropertyEdit!) {
    modifyProperty(propertyFields: $nuevosCampos) {
      id
      address
      latitude
      longitude
      price
      currency
    }
  }
`;
