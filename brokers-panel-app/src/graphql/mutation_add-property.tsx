
import {gql} from 'apollo-boost';

export const ADD_PROPERTY = gql`
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

