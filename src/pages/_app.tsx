import "../../styles/globals.css"
import type { AppProps } from 'next/app'
import Layout from '../layout/Layout'
import { apolloClient, ApolloProvider } from "../apolloClient";
import { ToastContainer } from 'react-toastify'
import { SessionProvider } from "next-auth/react"



export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return <SessionProvider session={session}>
            <ApolloProvider client={apolloClient}>
              <Layout>
                <Component {...pageProps} />
                <ToastContainer />
              </Layout>
          </ApolloProvider>
         </SessionProvider>

}
