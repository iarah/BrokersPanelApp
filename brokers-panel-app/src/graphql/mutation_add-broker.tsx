
import {gql} from 'apollo-boost';

export const ADD_BROKER = gql`
    mutation createBroker($input: BrokerInput!){
        createBroker(
            brokerInput: $input
        ){
            id
            name
            address
        }
    }
    `;

