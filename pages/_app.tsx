import type {AppProps} from 'next/app'
import '../styles/globals.scss'
import 'normalize.css';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'

const queryClient = new QueryClient()

function MyApp({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
        </QueryClientProvider>
    )
}

export default MyApp
