"use client"
import { Card, CardBody, Image, CardFooter, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Images from "next/image";
import { Database } from "@App/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import Facebook from "../../../public/assets/svg/facebook.svg"
// import Github from "../../../public/assets/svg/github.svg"
// import Igram from "../../../public/assets/svg/ig.svg"

function about() {
    const supabase = createClientComponentClient<Database>();
    const [aboutData, setAboutData] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            let { data: aboutData } = await supabase
                .from('aboutMe')
                .select('*')

            if (aboutData) {
                setAboutData(aboutData)
            }
        };
        fetchData();
    }, []);

    const handleClick = (item: any, name: string) => {
        if (name === 'ig') {
            window.open(item?.igurl, '_blank')
        }
        if (name === 'git') {
            window.open(item?.ghurl, '_blank')
        }
        if (name === 'fb') {
            window.open(item?.fburl, '_blank')
        }
    }

    const allAbout = aboutData.map((item: any, i: number) => (
        <Card className="grid" key={i}>
            <CardBody>
                <Image
                    src={item.imageurl}
                />
            </CardBody>
            <CardFooter
                className="grid grid-rows-3 justify-items-center"
            >
                <p className="w-full text-center font-bold md:text-[18px] lg:text-[20px]">{item.name}</p>
                <p className="w-full text-center text-[16px] text-gray-500">{item.role}</p>
                <div className="grid grid-cols-3">
                    <Button
                        isIconOnly
                        variant="light"
                        disableAnimation
                        disableRipple
                        onClick={() => handleClick(item, "ig")}
                    >
                        ig
                        {/* <Images width={30} height={30} src={Igram} alt="Igram" /> */}
                    </Button>
                    <Button
                        isIconOnly
                        variant="light"
                        disableAnimation
                        disableRipple
                        onClick={() => handleClick(item, "fb")}
                    >
                        fb
                        {/* <Images width={30} height={30} src={Facebook} alt="facebook" /> */}
                    </Button>
                    <Button
                        isIconOnly
                        variant="light"
                        disableAnimation
                        disableRipple
                        onClick={() => handleClick(item, "git")}
                    >
                        git
                        {/* <Images width={25} height={25} src={Github} alt="Github" /> */}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    ));

    return (
        <div className="container mx-auto px-4">
            <div>
                <p className='text-[24px] md:text-[30px] lg:text-[40px] text-black font-semibold text-center p-8'> About Us</p>
                <p className="text-[16px] md:text-[18px] lg:text-[20px] font-normal text-center"> เว็บไซต์นี้จัดทำขึ้นเพื่อศึกษาเรียนรู้เกี่ยวกับการใช้งานอัลกอริทึม AI และการเขียนเว็บไซต์ด้วยภาษา TypeScript
                    <br /> ในส่วนของตัว AI ศึกษาเกี่ยวกับอัลกอริทึมที่ชื่อว่า Collaborative Filtering , Cosine Similarity มาเพื่อแนะนำกิจกรรมบนเว็บไซต์
                </p>
            </div>
            <div className="w-full grid justify-items-center">
                <p className='grid text-[24px] md:text-[30px] lg:text-[40px] text-black font-semibold text-center p-8'>
                    Team Member
                </p>
                <div className="grid grid-cols-3 gap-x-8 w-[90vh]">
                    {allAbout}
                </div>
            </div>
        </div>
    )
}

export default about