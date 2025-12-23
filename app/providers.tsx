'use client';

import type React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { getApolloClient } from '@/lib/apollo-client';

export function Providers({ children }: { children: React.ReactNode }) {
    const client = getApolloClient();

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
