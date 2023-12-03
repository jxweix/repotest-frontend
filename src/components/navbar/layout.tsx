import Navbar from "@App/components/navbar/nav";
import type { IChildren } from "@App/types/common.types";

export default function Layout({ children }: Readonly<IChildren>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
