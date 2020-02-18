import React from "react";
import { useMutation } from '@apollo/react-hooks';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../utils/client';
import {ADD_PROPERTY} from '../graphql/mutation_add-property';

export const AddProperty: React.FC = () => {
    const [addBroker, {data}] = useMutation(ADD_PROPERTY);
    const [open, setOpen] = React.useState(false);


  return (
    <ApolloProvider client={client}>       
    Agregar Property
    </ApolloProvider>
  );
};