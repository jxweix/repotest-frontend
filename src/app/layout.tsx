import "@App/styles/globals.css";
import type { IChildren } from "@App/types/common.types";
import Navbar from "@components/navbar/layout";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { useRouter } from "next/router";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({ children }: Readonly<IChildren>) {
  const router = useRouter();
  const bkNavbar = router.pathname !== "/_error";

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        {bkNavbar ? (
          <MantineProvider>
            <Navbar>{children}</Navbar>
          </MantineProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
