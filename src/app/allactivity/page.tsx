"use client";
import {
  Card,
  CardHeader,
  Chip,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Database } from "@App/types/database.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

function yedrootad() {
  const [datacard, setDatacard] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [keytypetbl, setKeytypetbl] = useState<any>([]);
  const [codata, setCodata] = useState<any>([]);
  const [databoard, setDataboard] = useState<any>([]);

  const supabase = createClientComponentClient<Database>();
  const [keyselect, setKeyselect] = useState<any>([]);

  const handlderCard = async (item: any) => {
    // const select = item.type_id;
    setKeyselect(item);
    console.log("this selectL item:", item);

    try {
      if (item) {
        const { data: activity, error } = await supabase
          .from("activity_show")
          .select("*")
          .in("type_id", [item.type_id]);

        if (activity) {
          setDataboard(activity);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          console.log("ไม่เข้า if อีกแล้วไอแม่เย้ด");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: typetbl } = await supabase.from("typetbl").select("*");

        if (typetbl) {
          setTableData(typetbl);
        }
        const { data: keytypetbl } = await supabase
          .from("typetbl")
          .select("type_id");
        if (keytypetbl) {
          setKeytypetbl(keytypetbl);
        }

        if (keytypetbl?.length && tableData?.length >= 1) {
          // Fetch data from release_type_img where keyImage is in keyImages
          const { data: srcData } = await supabase
            .from("release_type_img")
            .select("*")
            .in(
              "type_id",
              keytypetbl.map((obj) => obj.type_id)
            );

          const joinData = tableData?.map((item1: any) => {
            const match = srcData?.find(
              (item2) => item2.type_id === item1.type_id
            );
            return { ...item1, ...match };
          });
          if (joinData) {
            setCodata(joinData);
          }
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetch();
  }, [tableData]);

  const cardMap = codata?.map((item: any, i: number) => {
    return (
      <div className="flex items-center justify-center" key={i}>
        <Card
          key={i}
          className="py-4 shadow-none "
          style={{ backgroundColor: "rgba(255, 255, 255, 0.0)" }}
          isPressable
          onPress={() => handlderCard(item)}
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-start text-center md:text-left">
            <p className="text-[34px] md:text-[34px] lg:text-[50px] text-white uppercase font-normal pt-4">
              {item.name}
            </p>
            <p className="text-[18px] md:text-[24px] lg:text-[24px] text-white font-normal -mt-2 md:-mt-4">
              {item.detail}
            </p>
          </CardHeader>
          <Image
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={item.src}
            width={370}
            height={500}
          />
        </Card>
      </div>
    );
  });

  const cardSelect = databoard?.map((item: any, i: number) => {
    return (
      <div className="flex items-center justify-center" key={i}>
        <Card
          key={i}
          className="py-4 shadow-none "
          style={{ backgroundColor: "rgba(255, 255, 255, 0.0)" }}
          isPressable
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-start text-center md:text-left ">
            <p className="text-[34px] md:text-[34px] lg:text-[50px] text-white uppercase font-normal pt-4">
              {item.name}
            </p>

            {item.detail && (
              <p className="text-[18px] md:text-[24px] lg:text-[24px] text-white font-normal -mt-2 md:-mt-4">
                {item.detail}
              </p>
            )}
          </CardHeader>
          <Image
            alt="Card background"
            className="z-0 w-full max-h-[500px] object-cover"
            src={item.src}
            width={370}
            height={500}
          />
        </Card>
      </div>
    );
  });

  return (
    <div className="BG-page123">
      <div className="md:container md:mx-auto">
        <div className="flex flex-col md:flex-row gap-2 pt-6 pl-4 md:pl-16"></div>
        {/* <div className="pt-6">
          <p className="text-[30px] md:text-[30px] lg:text-[50px] text-white font-semibold pl-4 md:pl-16">
            เลือกสิ่งที่คุณสนใจ
          </p>
          <p className="text-[18px] md:text-[20px] lg:text-[30px] text-white font-semibold -mt-2 md:-mt-3 pl-4 h-16 md:pl-16">
            คนหากิจกรรมที่คุณสนใจ
          </p>
        </div> */}
        <div>
          <h6 className="text-[30px] md:text-[30px] lg:text-[50px] text-white font-semibold pl-4 md:pl-16">
            {keyselect?.name
              ? `ประเภทกิจกรรม '${keyselect.name}'`
              : "ประเภทกิจกรรมทั้งหมด"}
          </h6>
          <div className="p-16 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-rows-3 gap-4 md:gap-6">
            {/* {cardMap} */}
            {databoard.length >= 1 ? cardSelect : cardMap}
          </div>
        </div>
      </div>
    </div>
  );
}

// export const getServerSideProps = async (context) => {
//   const res = await fetch("http://localhost:3000/api/cardphoto");
//   const cardphoto = await res.json();
//   return { props: { cardphoto } };
// };
export default yedrootad;
