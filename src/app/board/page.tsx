"use client";
import "./style.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardHeader, ScrollShadow, Chip } from "@nextui-org/react";
import { Database } from "@App/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Center, Notification, RingProgress, Text } from "@mantine/core";

// import getBoard from '@App/actions/getBoard';
function boardHome() {
  const supabase = createClientComponentClient<Database>();
  const [dataCon, setDataCon] = useState<any>([]);
  const [dataPython, setdataPython] = useState<any>([]);
  const [dataUserall, setDataUserall] = useState<any>([]);
  const router = useRouter();

  //pthon
  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = await supabase.auth.getUser();
        const getUser: any = id.data.user?.id;
        let { data: UserCon } = await supabase
          .from("userConjoin_front")
          .select("*");
        const Userlength: number | any = UserCon?.length;

        //เอา getId ส่งไป ai แล้ว fetch ข้อมูลกลับมา
        if (getUser && getUser.length >= 1) {
          const { data: getId } = await supabase
            .from("userConjoin_front")
            .select("*")
            .in("id", [getUser]);
          const mapus = getId?.map((item: any) => item.No)[0];
          parseInt(mapus);
          const res = await fetch(`https://repotest-backend.onrender.com/user_id/${mapus}`);
          let dataRes: any = await res.json();

          if (dataRes) {
            const codes = dataRes.find((item: any) => item.code === 404);
            if (codes && dataRes.length >= 1) {
              alert(`404 kub pee \n >>>>>${codes.messegs}<<<<<`);
            }
          }
          let { data: fetchSrc } = await supabase
            .from("activity_show")
            .select("*")
            .in(
              "type_id",
              dataRes.map((item: any) => item.type_id)
            );


          let { data: nametype } = await supabase
            .from("typetbl")
            .select("*")
            .in(
              "type_id",
              dataRes.map((item: any) => item.type_id)
            );

          if (fetchSrc) {
            // รวมจาก ai กับ src
            const joinData = fetchSrc?.map((item1: any) => {
              const match = dataRes?.find(
                (item2: any) => item2.type_id === item1.type_id
              );
              return { ...item1, ...match };
            });

            if (joinData) {
              // รวมชื่อกับ ข้อมูลก่อนหน้า
              const setPython = joinData?.map((item1: any) => {
                const match = nametype?.find(
                  (item2: any) => item2.type_id === item1.type_id
                );
                return { ...item1, ...match };
              });
              const scoreItem = setPython.map((item: any) => ({
                ...item,
                score: (item.score / Userlength) * 100,
              }));
              setdataPython(scoreItem);
            }
          }
        }
      } catch (error) { }
    };
    fetchData();
  }, []);
  console.log("ngo", dataCon);

  const handPressable = (item: any) => {
    router.push(`board/${item.id}/detail`)
  }

  const pythonCard = dataPython?.map((img: any, i: number) => (
    <Card className="figure" key={i} isFooterBlurred isPressable onPress={() => handPressable(img)}>
      <CardHeader className="Header backdrop-blur">
        <div className="Item-hidden backdrop-contrast-50 w-full">
          <div className="grid grid-cols-3 grid-rows-2 w-full">
            <div className="grid row-span-2 col-span-2 pl-[10px]">
              <h4 className="mix-blend-screen font-medium text-[24px] grid items-end text-left ">
                {img.name}
              </h4>
              <Chip className="chip mix-blend-overlay">{img.nametype}</Chip>
            </div>

            {/* <Chip className='chip justify-self-end'>{img.nametype}</Chip> */}
            <div className="row-span-2 grid justify-items-end w-full">
              <span>
                <RingProgress
                  size={90}
                  thickness={10}
                  roundCaps
                  sections={[{ value: img.score, color: "blue" }]}
                  label={
                    <Text c="blue" fw={700} ta="center" size="xl">
                      {parseInt(img.score) + "%"}
                    </Text>
                  }
                />
                <Text ta="center" className="uppercase">
                  Top Rate
                </Text>
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <Image
        className="imgcard"
        src={img.src}
        alt="photo"
        width={590}
        height={590}
      />
    </Card>
  ));

  return (
    <>
      <div className="BG-page123 bg-violet-100 bg-none">
        <div className="h-full pb-[3vh] overflow-x-hidden">
          <div className="grid bg-transparent h-[20vh] mt-[10vh] items-center">
            <p className="text-[60px] pl-[10vh] font-bold text-black">
              นี่คือกิจกรรมที่เราแนะนำให้กับคุณ
            </p>

            <p className="text-[40px] pl-[10vh]  font-normal text-slate-600">
              กิจกรรมต่างๆที่แนะนำ
            </p>
          </div>
        </div>
      </div>
      <div>
        <ScrollShadow hideScrollBar>
          <div className="wrapper">
            <div className="container">
              {/* {comimage} */}
              {/* <h1 className="uppercase">มีแค่ที่แนะนำกับ user</h1> */}
              {pythonCard}
            </div>
          </div>
        </ScrollShadow>
      </div>
    </>
  );
}
export default boardHome;