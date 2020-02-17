import React from "react";
import { Collapsible } from "@oneloop/jopijs";
import  client  from '../utils/client';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { ApolloProvider } from '@apollo/react-hooks';


const GET_BROKERS = gql`
    query{
        brokers{
        id
        name
        address
        }
    }
    `;


export const BrokersList: React.FC = () => {
    const { data, loading, error } = useQuery(GET_BROKERS);    
    const [open, setOpen] = React.useState(false);

  return (
    <div>   
        <ApolloProvider client={client}> 
    { data?.brokers.map(
        (broker:any, index:any) => 
        <Collapsible width={1 / 3} isOpen={open}>
            <Collapsible.Button
                onClick={() => setOpen(!open)}
                variant="default"
                borderBottom="1px solid #e7e7e6"
                key={index}
            >
            {broker.name}
            </Collapsible.Button>
            <Collapsible.Body>
            ID: {broker.id}           
            <br/>
            ADDRESS: {broker.address}
            </Collapsible.Body>
        </Collapsible>)
    }    
    </ApolloProvider>   
    </div>
  );
};