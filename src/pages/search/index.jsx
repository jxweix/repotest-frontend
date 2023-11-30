import React from "react";
import cardphoto from "../api/cardphoto";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";

function search({ cardphoto }) {
  const mockData = [
    {
      img: "/photo/pic-1.jpg",
      title: "กีฬาทางน้ำ",
      text: "ว่ายน้ำ ปาร์ตี้ริมสระ",
    },
    {
      img: "/photo/pic-1.jpg",
      title: "เอ็กตรีม",
      text: "กระโดดร่ม ปืนหน้าผา",
    },
    {
      img: "/photo/pic-1.jpg",
      title: "กีฬากลางแจ้ง",
      text: "เล่นบอล ตีเทนนิส",
    },
    {
      img: "/photo/pic-1.jpg",
      title: "บอร์ดเกม",
      text: "เล่นไผ่ หมาป่า เกมเศรษฐี",
    },
    {
      img: "/photo/pic-1.jpg",
      title: "เกมออนไลน์",
      text: "เกมยิงปืน เกมต่อสู้",
    }
  ];

  // const cardMaps = cardphoto.mock.map((card, i) => {
  const cardMaps = mockData.map((card, i) => {
    const key = `card-${i}`;
    return (
      // <Card key={key} isFooterBlurred radius="lg" className="border-none">
      //   <Image
      //     alt="Woman listing to music"
      //     className="cdphoto"
      //     src={card.img}
      //   />
      //   <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
      //     <p className="text-tiny text-black/80">{card.title}</p>
      //     <Button
      //       className="text-tiny text-black bg-black/20"
      //       variant="flat"
      //       color="default"
      //       radius="lg"
      //       size="sm"
      //     >
      //       {card.text}
      //     </Button>
      //   </CardFooter>
      // </Card>

      <Card key={key} className="py-4 shadow-none" style={{ backgroundColor: 'rgba(255, 255, 255, 0.0)' }}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center justify-center">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="items-center">
          <Image
            alt="Card background"
            src={card.img}
            width={270}
          />
        </CardBody>
      </Card>
    );
  });

  return (
    <div className="bgsearch">
      <div className="md:container md:mx-auto">
        <div className="pt-6">
          <p className="text-[60px] text-white font-semibold ">เลือกสิ่งที่คุณสนใจ </p>
          <p className="text-white font-semibold -mt-6">คนหากิจกรรมที่คุณสนใจ</p>
        </div>
        <div>
          <h6>กีฬา</h6>
          <div className="grid lg: grid-cols-3 grid-rows-3">{cardMaps}</div>
        </div>
      </div>
    </div>
  );
}

// export const getServerSideProps = async (context) => {
//   try {
//     // const res = await fetch("http://localhost:3000/api/cardphoto"); / ใช้ตอน local
//     const res = await fetch("https://repotest-dev.vercel.app/api/cardphoto") /ตอนอัพ path เปลี่ยน
//     const cardphoto = await res.json();
//     return { props: { cardphoto } };
//   }
//   catch (error) {
//     console.error("this error bro: ", error);
//     return { props: { cardphoto : null}};
//   }
// };
export default search;
