import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../src/layout/Layout'
import { apolloClient, ApolloProvider } from "../src/apolloClient";



export default function App({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={apolloClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
         </ApolloProvider>

}
