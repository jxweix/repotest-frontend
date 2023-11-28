import '@App/styles/globals.css'
import Layout from '@components/navbar/layout'

export default function App({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}
