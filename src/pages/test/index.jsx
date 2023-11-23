import React from "react";
import Link from "next/link";

function p1() {
  return (
    <div>
      <Link href={"/test/1"}> 1</Link>
      <Link href={"/test/2"}> 2</Link>
      <Link href={"/test/3"}> 3</Link>
      <Link href={"/test/4"}> 4</Link>
    </div>
  );
}

export default p1;
