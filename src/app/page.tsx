"use client"
import { Button } from "@nextui-org/react";
import React from 'react';

function page() {

  return (
    <div className="BG-page123">
      <div className="wrapper">
        <div className="grid grid-rows-2 justify-items-center">
          <p className=" grid row-span-1 text-[64px] text-center text-white font-semibold">มาใช้ประโยชน์จากเวลาว่างกันเถอะ</p>
          <Button
            className="w-[160px] h-[50px] text-white"
            style={{
              background: 'linear-gradient(to right, #9500FF, #6F00B3)',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            radius="full"
            variant='light'
            color="secondary"
          >
            <p className='text-[24px]'>สร้างบัญชี</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
export default page;