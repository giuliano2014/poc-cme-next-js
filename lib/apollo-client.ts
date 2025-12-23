import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';

let client: ApolloClient<any> | null = null;

export function getApolloClient() {
    if (!client || typeof window === 'undefined') {
        client = new ApolloClient({
            ssrMode: typeof window === 'undefined',
            link: from([
                new HttpLink({
                    uri: 'https://mcstaging.c-monetiquette.fr/graphql'
                })
            ]),
            cache: new InMemoryCache({
                typePolicies: {
                    Query: {
                        fields: {
                            getHomePageData: {
                                merge: true
                            }
                        }
                    }
                }
            })
        });
    }
    return client;
}

export const getClient = getApolloClient;
