import React from "react";
import { List, Collapsible } from "@oneloop/jopijs";
import {Title} from './Title';
import ApolloClient from 'apollo-boost';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../utils/client';

const GET_PROPERTIES = gql`
    query{
        properties{
        id
        address
        latitude
        longitude
        price
        currency
        broker{
            name
        }
        }
    }
    `;


export const PropertiesList: React.FC = () => {
    const { data, loading, error } = useQuery(GET_PROPERTIES);
    const [open, setOpen] = React.useState(false);

  return (
        <ApolloProvider client={client}> 
        <List>
        {data?.properties.map(
            (property:any, index:any) =>
                <List.Item key={index}>{property.id} {property.address} | {property.broker.name} </List.Item>
                )
        }
        </List>
        </ApolloProvider> 
  );
};


//let properties = [];
/*client.query({
    query:gql`
    query{
        properties{
          
          address
          
        }
      }
    `
  }).then(result => {//properties.push(result);
  Array(result.data.properties).map(res => console.log(res.address));});
  */