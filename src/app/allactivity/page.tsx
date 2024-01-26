"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ScrollShadow,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Database } from "@App/types/database.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

function allactivity() {
  const supabase = createClientComponentClient<Database>();
  const [dataitem, setDataitem] = useState<any>([]);
  const [tpyeitem, setTypeitem] = useState<any>([]);

  // const handlderCard = async (item: any) => {
  //   setKeyselect(item);
  //   console.log("this selectL item:", item);

  //   try {
  //     if (item) {
  //       const { data: activity, error } = await supabase
  //         .from("activity_show")
  //         .select("*")
  //         .in("type_id", [item.type_id]);

  //       if (activity) {
  //         setDataboard(activity);
  //         window.scrollTo({ top: 0, behavior: "smooth" });
  //       } else {
  //         console.log("ไม่เข้า if อีกแล้วไอแม่เย้ด");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  useEffect(() => {
    const fetch = async () => {
      const selecttype = [2, 6, 10, 14, 13]
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
      <Card
        key={i}
        className="py-4 shadow-none min-w-[370px] w-[370px] max-h-[510px]"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.0)" }}
      // isPressable
      // onPress={() => handlderCard(item)}
      >
        <CardHeader className="absolute z-10 top-1 flex-col !items-start text-center md:text-left px-0">
          <div className="bg-slate-500 w-full opacity-70 rounded-t-lg">
            <p className="text-[34px] md:text-[34px] lg:text-[41px] opacity-100 font-normal text-white uppercase px-2 pt-4">
              {carditem.name}
            </p>
          </div>

        </CardHeader>
        <Image
          alt="Card background"
          className="z-0 w-full h-full object-cover object-center rounded-lg"
          src={carditem.src}
          width={370}
          height={510}
          draggable={false}
        />
      </Card >
    ));

    return (
      <>
        <div className="pl-[10vh] pt-[5vh]">
          <p className="text-[55px] uppercase font-bold">
            {item.nametype}
          </p>
          <Divider className="my-4 bg-slate-800 h-[2px] w-[1690px]" />
        </div>
        <div className="px-[10vh]">
          <div className="w-[1690px] h-full">
            <ScrollShadow
              orientation="horizontal"
              className="flex flex-initial flex-nowrap overflow-x-auto gap-5 scrollbar-hide"
            >
              {cardMapForType}
            </ScrollShadow>
          </div>
        </div>
      </>
    )
  })


  return (
    <div className="BG-page123 bg-white bg-none">
      <div className="h-full pb-[3vh] overflow-x-hidden">
        <div className="grid bg-purple-200 h-[20vh] items-center">
          <p className="text-[60px] pl-[10vh]">
            Choose your favorite
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