"use client";
import {
  Card,
  CardHeader,
  Divider,
  Image,
  ScrollShadow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Database } from "@App/types/database.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function allactivity() {
  const supabase = createClientComponentClient<Database>();
  const [dataitem, setDataitem] = useState<any>([]);
  const [tpyeitem, setTypeitem] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      const selecttype = [1, 2, 3, 4, 5]
      try {
        let { data: headitem } = await supabase
          .from('typetbl')
          .select('*')
          .in('type_id', selecttype)
        setTypeitem(headitem)

        let { data: typeimg } = await supabase
          .from('activity_show')
          .select('*')
          .in('type_id', selecttype)
        if (typeimg) {
          setDataitem(typeimg)
        }
      } catch (error: any) {
        console.error('Error fetching data:', error?.message);
      }
    };
    fetch();
  }, []);

  const groupMap = tpyeitem.map((item: any) => {
    const filteredData = dataitem.filter((dataItem: any) => dataItem.type_id === item.type_id);
    const cardMapForType = filteredData.map((carditem: any, i: number) => (
      <div data-id={item.nametype.toLowerCase()}>
        <Card
          key={i}
          className="py-4 shadow-none min-w-[370px] w-[370px] max-h-[450px]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.0)" }}
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-start text-center md:text-left px-0">
            <div className=" bg-white w-30 opacity-100 mt-12 ml-12 hover:bg-black ">
              <p className="text-[10px] md:text-[15px] lg:text-[15px] opacity-100 font-normal text-black uppercase px-2 hover:text-white">
                {carditem.name}
              </p>
            </div>

          </CardHeader>
          <div className="p-8">
            <Image
              alt="Card background"
              className="activityhv z-0 w-full h-full object-cover object-center rounded-none"
              src={carditem.src}
              width={370}
              height={510}
              draggable={false}
            />
          </div>
        </Card >
      </div>
    ));

    return (
      <>
        <div className="pl-[10vh] pt-[5vh]">
          <p className="text-[40px] uppercase font-bold">
            {item.nametype}
          </p>
          <Divider className="my-4 bg-slate-800 h-[2px] w-[1690px]" />
        </div>
        <div className="px-[10vh]">
          <div className="w-[1690px] h-full">
            <ScrollShadow
              id="style-1"
              orientation="horizontal"
              className="flex flex-initial flex-nowrap overflow-x-auto gap-5 pb-8"
            >
              {cardMapForType}
            </ScrollShadow>
          </div>
        </div>
      </>
    )
  })


  return (
    <div className="BG-page123 bg-violet-100 bg-none">
      <div className="h-full pb-[3vh] overflow-x-hidden">
        <div className="grid bg-transparent h-[20vh] mt-[10vh] items-center">
          <p className="text-[60px] pl-[10vh] font-bold text-black">
            All Activity
          </p>
          <p className="text-[60px] pl-[10vh]  font-normal text-slate-600">
            all categories and activities
          </p>
        </div>
        {groupMap}
      </div>
    </div>
  );
}

// export const getServerSideProps = async (context) => {
//   const res = await fetch("http://localhost:3000/api/cardphoto");
//   const cardphoto = await res.json();
//   return { props: { cardphoto } };
// };
export default allactivity;