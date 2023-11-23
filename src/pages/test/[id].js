import Btn from "@App/components/btn";
import { useRouter } from "next/router";
import React from "react";

function ID() {
  const router = useRouter();
  return (
    <div>
      <h1>{router.query?.id}</h1>
      <Btn name={"1234444"} />
    </div>
  );
}

export default ID;
