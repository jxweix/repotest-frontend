"use client";
import "./style.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardHeader, Chip, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Database } from "@App/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { RingProgress, Text } from "@mantine/core";

function boardHome() {
  const supabase = createClientComponentClient<Database>();
  const [dataPython, setdataPython] = useState<any>([]);
  const router = useRouter();
  const { isOpen, onOpen } = useDisclosure();

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
          console.log("🚀 ~ fetchData ~ dataRes:", dataRes.detail)

          if ('detail' in dataRes) {
            onOpen()
          }

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
              setdataPython(scoreItem.sort((a, b) => b.score - a.score));
            }
          }
        }
        else {
          router.push('/');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      } catch (error) {
        console.log('error: ', error);
      }
    };
    fetchData();
  }, [onOpen]);

  const handPressable = (item: any) => {
    router.push(`board/${item.id}/detail`)
  }

  const pythonCard = dataPython?.map((img: any, i: number) => (
    <Card className="figure mb-2" key={i} isFooterBlurred isPressable onPress={() => handPressable(img)}>
      <CardHeader className="Header backdrop-blur">
        <div className="Item-hidden backdrop-contrast-50 w-full">
          <div className="grid grid-cols-3 grid-rows-2 w-full">
            <div className="grid row-span-2 col-span-2 pl-[10px]">
              <h4 className="mix-blend-screen font-medium text-[24px] grid items-end text-left ">
                {img.name}
              </h4>
              <Chip className="chip mix-blend-overlay">{img.nametype}</Chip>
            </div>
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

  const handleChageSe = () => {
    router.push('/select')
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <p>
                  คุณยังไม่ได้เลือกความชอบ
                </p>
              </ModalHeader>
              <ModalFooter>
                <Button color="primary" onPress={handleChageSe}>
                  ตงลง
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div>
        <div className="h-[20vh] xl:h-[25vh] overflow-hidden bg-purple-500">
          <div className="row-span-1 grid h-full items-center">
            <p className="xl:text-[40px] md:text-[24px] h-full grid items-end pl-[7vh] font-normal text-black">
              นี่คือกิจกรรมที่เราแนะนำให้กับคุณ
            </p>
            <p className="xl:text-[40px] md:text-[18px] h-full grid items-start pl-[7vh] font-normal text-slate-600">
              กิจกรรมต่างๆที่แนะนำ
            </p>
          </div>
        </div>
        <div className="wrapper">
          <div className="container">
            {pythonCard}
          </div>
        </div>
      </div>
    </>
  );
}
export default boardHome;