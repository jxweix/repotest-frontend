import type { IChildren } from "@App/types/common.types";
import Navbar from "@components/navbar/layout";
import "@mantine/carousel/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import './style/globals.css'

export default function RootLayout({ children }: Readonly<IChildren>) {

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Navbar>{children}</Navbar>
        </MantineProvider>
      </body>
    </html>
  );
}
