import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL, // e.g. 'http://localhost:3000/api/graphql'
});

const authLink = setContext((_, { headers }) => {
  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('authToken');
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
