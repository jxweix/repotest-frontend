"use client"
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
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function allactivity() {
  const supabase = createClientComponentClient<Database>();
  const [dataitem, setDataitem] = useState<any>([]);
  const [tpyeitem, setTypeitem] = useState<any>([]);

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
        <div className="xl:px-[10vh] lg:px-[5vh] pt-[5vh] md:px-4">
          <p className="text-[40px] uppercase font-bold">
            {item.nametype}
          </p>
          <Divider className="my-4 bg-slate-800 h-[2px] xl:w-[1690px] lg:w-[960px] md:w-[340px]" />
        </div>
        <div className="xl:px-[10vh] lg:px-[10px] md:px-2">
          <div className="xl:w-[1690px] h-full lg:w-[1004px] md:w-[340px]">
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
    <>
      <div className="h-[20vh] xl:h-[25vh] overflow-hidden bg-purple-500">
        <div className="row-span-1 grid h-full items-center">
          <p className="xl:text-[40px] md:text-[24px] h-full grid items-end pl-[7vh] font-normal text-black">
            All Activity
          </p>
          <p className="xl:text-[35px] md:text-[18px] h-full grid items-start pl-[7vh] font-normal text-white">
            all categories and activities
          </p>
        </div>
      </div>
      <div>
        {groupMap}
      </div>
    </>
  );
}
export default allactivity;