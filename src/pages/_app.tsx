import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#1A1A1A',
                color: '#fff',
                border: '1px solid #2A2A2A',
              },
              success: {
                iconTheme: {
                  primary: '#F0CC0E',
                  secondary: '#000',
                },
              },
              error: {
                iconTheme: {
                  primary: '#F12F2F',
                  secondary: '#fff',
                },
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
