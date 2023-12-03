"use client"
import { Button } from "@nextui-org/react";

function home() {
    return (
        <div className="BG-page123">
            <div className="wrapper">
                <div className="grid grid-rows-2 justify-items-center">
                    <p className=" grid row-span-1 text-[64px] text-center text-white font-semibold">มาใช้ประโยชน์จากเวลาว่างกันเถอะ</p>
                    <Button
                        className="w-[160px] h-[50px] text-white bg-gradient-to-r from-purple-950 to-violet-300 via-violet-700 to-transparent shadow"
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

export default home;
