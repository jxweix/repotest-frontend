import '@App/styles/globals.css'
import Navbar from '@components/navbar/layout'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {

  const router = useRouter();
  const bkNavbar = router.pathname !== "/_error"

  return (
    <>
      {bkNavbar && (
        <Navbar className="dark text-foreground bg-background">
          <Component {...pageProps} />
        </Navbar>
      )}
      {!bkNavbar && <Component {...pageProps} />}
    </>
  );

}
