import { gql } from "apollo-boost";

export const GET_PROPERTIES = gql`
  query {
    properties {
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

export const GET_BROKERS = gql`
  query {
    brokers {
      id
      name
      address
    }
  }
`;
