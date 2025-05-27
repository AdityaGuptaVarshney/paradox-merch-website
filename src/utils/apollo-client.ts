// src/utils/apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export function createApolloClient() {
    const httpLink = createHttpLink({
        uri: 'http://localhost:8082/query',
    });

    const authLink = setContext((_, { headers }) => {
        // Get token from localStorage or elsewhere
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

        return {
            headers: {
                ...headers,
                authorization: token ? token : '',
            }
        };
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
}
