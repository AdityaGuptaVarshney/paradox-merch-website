// src/contexts/GraphQLContext.tsx
import {createContext, ReactNode, useContext, useState} from 'react';
import {ApolloClient, ApolloError, DocumentNode, NormalizedCacheObject, TypedDocumentNode} from '@apollo/client';
import {createApolloClient} from '@/utils/apollo-client';
import {toast} from 'react-hot-toast';
import {useAuth} from '@/hooks/useAuth'; // You'll need to implement auth hooks

interface GraphQLContextType {
    query: <T>(q: TypedDocumentNode | DocumentNode, variables?: {
        [name: string]: any
    }, errorToast?: boolean) => Promise<T>;
    mutate: <T>(q: TypedDocumentNode | DocumentNode, variables?: {
        [name: string]: any
    }, errorToast?: boolean, successToast?: boolean) => Promise<T>;
    success: (detail?: string, summary?: string) => void;
    error: (e: any, detail?: string, summary?: string) => void;
}

const GraphQLContext = createContext<GraphQLContextType | undefined>(undefined);

export function GraphQLProvider({children}: { children: ReactNode }) {
    const [client] = useState<ApolloClient<NormalizedCacheObject>>(createApolloClient());
    const {token, refreshToken} = useAuth();

    const query = async <T, >(q: TypedDocumentNode | DocumentNode, variables?: any, errorToast = true): Promise<T> => {
        try {
            const result = await client.query({
                query: q,
                variables,
            });

            if (result.errors?.length) {
                const err = result.errors[0].message;

                if (err === 'token has invalid claims: token is expired' || err === 'user is Disabled') {
                    await refreshToken();
                    return query(q, variables, errorToast);
                } else if (errorToast) {
                    toast.error(err);
                }
                throw result.errors;
            }

            return result.data as T;
        } catch (error) {
            if (errorToast && error instanceof ApolloError) {
                toast.error(error.message);
            }
            throw error;
        }
    };

    const mutate = async <T, >(
        q: TypedDocumentNode | DocumentNode,
        variables?: any,
        errorToast = true,
        successToast = true
    ): Promise<T> => {
        try {
            const result = await client.mutate({
                mutation: q,
                variables,
            });

            if (result.errors?.length) {
                const err = result.errors[0].message;

                if (err === 'token has invalid claims: token is expired') {
                    await refreshToken();
                    return query(q, variables, errorToast);
                } else if (errorToast) {
                    toast.error(err);
                }
                throw result.errors;
            }

            if (successToast) {
                success();
            }

            return result.data as T;
        } catch (error) {
            if (errorToast && error instanceof ApolloError) {
                console.log(error.message);
                toast.error(error.message);
            }
            throw error;
        }
    };

    const success = (detail = 'Saved Successfully', summary = 'Success') => {
        toast.success(`${summary}: ${detail}`);
    };

    const error = (e: any, detail = '', summary = 'Failed') => {
        if (e?.error?.message) {
            detail = `${detail} ${e.error.message}`;
        }
        toast.error(`${summary}: ${detail}`);
    };

    const value: GraphQLContextType = {
        query,
        mutate,
        success,
        error,
    };

    return <GraphQLContext.Provider value={value}>{children}</GraphQLContext.Provider>;
}

export function useGraphQL() {
    const context = useContext(GraphQLContext);
    if (context === undefined) {
        throw new Error('useGraphQL must be used within a GraphQLProvider');
    }
    return context;
}
