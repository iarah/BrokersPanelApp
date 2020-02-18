import React from "react";
import { Collapsible } from "@oneloop/jopijs";
import { useMutation } from '@apollo/react-hooks';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../utils/client';
import {ADD_BROKER} from '../graphql/mutation_add-broker';

export const AddBroker: React.FC = () => {
    const [addBroker, {data}] = useMutation(ADD_BROKER);
    const [open, setOpen] = React.useState(false);


  return (
    <ApolloProvider client={client}>       
    Agregar Broker
    </ApolloProvider>
  );
};