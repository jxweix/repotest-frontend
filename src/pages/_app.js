import '@App/styles/globals.css'
import '@mantine/core/styles.css';
import Navbar from '@components/navbar/layout'
import { useRouter } from 'next/router';
import { MantineProvider } from '@mantine/core';

export default function App({ Component, pageProps }) {

  const router = useRouter();
  const bkNavbar = router.pathname !== "/_error"

  return (
    <>
      {bkNavbar && (
        <MantineProvider>
          <Navbar className="dark text-foreground bg-background">
            <Component {...pageProps} />
          </Navbar>
        </MantineProvider>
      )}
      {!bkNavbar && <Component {...pageProps} />}
    </>
  );

}
