import '@App/styles/globals.css'
import Layout from '@components/navbar/layout'

export default function App({ Component, pageProps }) {
  return <Layout className="dark text-foreground bg-background">
    <Component {...pageProps} />
  </Layout>
}
