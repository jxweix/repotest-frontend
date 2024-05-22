"use client"
import React from "react";
import {Card, Skeleton} from "@nextui-org/react";

export default function skeleton() {
  return (
    <Card className="w-[450px] h-[590px] space-y-5 p-4" radius="lg">
      <div className="flex flex-col py-[45px] gap-3 space-y-2 h-[140px]">
        <Skeleton className="w-3/5 rounded-lg ">
          <div className="h-[40px] w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-[30px] w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
      <Skeleton className="rounded-lg">
        <div className="h-[410px] rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  );
}
