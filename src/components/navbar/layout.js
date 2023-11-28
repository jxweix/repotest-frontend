import React from "react";
import { Montserrat } from "next/font/google";
import Navjs from "@components/navbar/navjs";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <div>
      <Navjs/>
      {children}
    </div>
  );
}
