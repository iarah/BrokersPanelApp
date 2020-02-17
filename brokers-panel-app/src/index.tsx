import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from "styled-components";
import theme from "@oneloop/theme";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import {gql} from 'apollo-boost';


const client = new ApolloClient({
  uri: 'http://localhost:5000/',
});



client.query({
  query:gql`
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
  `
}).then(result => console.log(result));


ReactDOM.render(
  <ApolloProvider client={client}>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
