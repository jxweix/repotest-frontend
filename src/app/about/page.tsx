"use client"
import { Card, CardHeader, CardBody, Image, CardFooter, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Database } from "@App/types/database.types";
import {
    User,
    createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

function page() {
    const supabase = createClientComponentClient<Database>();
    const [names, setNames] = useState<any>([]);
    const [roles, setRoles] = useState<any>([]);
    const [imageurl, setimageurl] = useState<any>([]);
    const [fburl, setFburl] = useState<any>([]);
    const [igurl, setIgurl] = useState<any>([]);
    const [ghurl, setGhurl] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: aboutData, error } = await supabase
                    .from('about')
                    .select('*');

                if (error) {
                    throw new Error(error.message);
                }
                const names = aboutData.map(item => item.name);
                const roles = aboutData.map(item => item.role);
                const imageurl = aboutData.map(item => item.imageurl);
                const fburl = aboutData.map(item => item.fburl);
                const igurl = aboutData.map(item => item.igurl);
                const ghurl = aboutData.map(item => item.ghurl);

                setNames(names);
                setRoles(roles);
                setimageurl(imageurl);
                setFburl(fburl);
                setIgurl(igurl);
                setGhurl(ghurl);
                if (!aboutData) {
                    throw new Error('Data is empty');
                }
            } catch (error) {
                console.error('Error fetching data:',);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <div>
                <p className='text-[24px] md:text-[30px] lg:text-[40px] text-black font-semibold text-center p-8'> About Us</p>
                <p className="text-[16px] md:text-[18px] lg:text-[20px] font-normal text-center"> เว็บไซต์นี้จัดทำขึ้นเพื่อศึกษาเรียนรู้เกี่ยวกับการใช้งานอัลกอริทึม AI และการเขียนเว็บไซต์ด้วยภาษา TypeScript 
                 <br /> ในส่วนของตัว AI ศึกษาเกี่ยวกับอัลกอริทึมที่ชื่อว่า Collaborative Filtering , Cosine Similarity มาเพื่อแนะนำกิจกรรมบนเว็บไซต์  
               </p>
            </div>
            <p className='text-[24px] md:text-[30px] lg:text-[40px] text-black font-semibold text-center p-8'> Team Member </p>
            <div className="relative overflow-hidden">
                <Card className="py-4 flex flex-col-reverse lg:flex-row justify-center gap-40">
                    {names.map((name: any, index: any) => (
                        <div key={index}>
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <h4 className="font-bold text-large">{name}</h4>
                                <small className="text-default-500">{roles[index]}</small>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <div className=" rounded-xl overflow-hidden border-2 border-black">

                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-none "
                                        src={imageurl[index]}
                                        width={270}
                                    />

                                </div>
                            </CardBody>
                            <div className="flex justify-center items-center opacity-100 hover:opacity-100 transition-opacity duration-1000">
                                <CardFooter className="gap-4 justify-center">
                                    <a href={fburl[index]}>
                                        <Button size="sm" className="bg-blue-400 hover:bg-blue-600 text-white">
                                            Facebook
                                        </Button>
                                    </a>
                                    <a href={igurl[index]}>
                                        <Button size="sm" className="bg-purple-400 hover:bg-purple-600 text-white">
                                            Instagram
                                        </Button>
                                    </a>
                                    <a href={ghurl[index]}>
                                        <Button size="sm" className="bg-gray-500 hover:bg-gray-800 text-white">
                                            Github
                                        </Button>
                                    </a>
                                </CardFooter>
                            </div>
                        </div>
                    ))}
                </Card>

            </div>
        </div>
    )
}

export default page
