import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

let client: ApolloClient<any> | null = null;

export function getClient() {
    // Create a new client for each request on the server
    // This ensures we don't share cache between requests
    if (typeof window === 'undefined') {
        return new ApolloClient({
            ssrMode: true,
            link: new HttpLink({
                uri: 'https://mcstaging.c-monetiquette.fr/graphql'
                // No fetchOptions - let Next.js handle caching via revalidate
            }),
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

    // Reuse client on the browser
    if (!client) {
        client = new ApolloClient({
            link: new HttpLink({
                uri: 'https://mcstaging.c-monetiquette.fr/graphql'
            }),
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

// Alias for backward compatibility
export const getApolloClient = getClient;
