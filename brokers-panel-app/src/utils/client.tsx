import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

const httpLink = new HttpLink({
    uri: 'http://localhost:5000/api/graphql',
    credentials: 'include',
  });
  
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
  
  export default client;