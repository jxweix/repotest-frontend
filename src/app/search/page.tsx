"use client"
import { Card, CardHeader, Chip, Image } from "@nextui-org/react";
import React from "react";

const initialFruits = [
  "เข้าวัดหวังเอาบุญ เข้าหาคุณหวังเอาหี",
  "อายุ 15 ตามหารักแท้",
  "วันไนท์สแตนด์",
  "นัดเย็ด",
  "1,500พี่ว่าไง",
];

function search() {
  const mockData = [
    {
      img: "/photo/Group 11.png",
      title: "กีฬาทางน้ำ",
      text: "ว่ายน้ำ ปาร์ตี้ริมสระ",
    },
    {
      img: "/photo/Group 12.png",
      title: "เอ็กตรีม",
      text: "กระโดดร่ม ปืนหน้าผา",
    },
    {
      img: "/photo/Group 14.png",
      title: "กีฬากลางแจ้ง",
      text: "เล่นบอล ตีเทนนิส",
    },
    {
      img: "/photo/Group 15.png",
      title: "บอร์ดเกม",
      text: "เล่นไผ่ หมาป่า เกมเศรษฐี",
    },
    {
      img: "/photo/Group 16.png",
      title: "เกมออนไลน์",
      text: "เกมยิงปืน เกมต่อสู้",
    },
  ];

  const [fruits, setFruits] = React.useState(initialFruits);

  const handleClose = (fruitToRemove: string) => {
    setFruits(fruits.filter((fruit) => fruit !== fruitToRemove));
    if (fruits.length === 1) {
      setFruits(initialFruits);
    }
  };

  // const cardMaps = cardphoto.mock.map((card, i) => {
  const cardMaps = mockData.map((card, i) => {
    const key = `card-${i}`;
    return (
      <div className="flex items-center justify-center">
        <Card
          key={key}
          className="py-4 shadow-none"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.0)" }}
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-start text-center md:text-left">
            <p className="text-[34px] md:text-[34px] lg:text-[50px] text-white uppercase font-normal pt-4">
              {card.title}
            </p>
            <p className="text-[18px] md:text-[24px] lg:text-[24px] text-white font-normal -mt-2 md:-mt-4">
              {card.text}
            </p>
          </CardHeader>
          <Image
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={card.img}
            width={370}
          />
        </Card>
      </div>
    );
  });

  return (
    <div className="BG-page123">
      <div className="md:container md:mx-auto">
        <div className="flex flex-col md:flex-row gap-2 pt-6 pl-4 md:pl-16">
          {fruits.map((fruit, index) => (
            <Chip
              key={index}
              onClose={() => handleClose(fruit)}
              variant="flat"
              className="bg-white"
            >
              {fruit}
            </Chip>
          ))}
        </div>
        <div className="pt-6">
          <p className="text-[30px] md:text-[30px] lg:text-[50px] text-white font-semibold pl-4 md:pl-16">
            เลือกสิ่งที่คุณสนใจ
          </p>
          <p className="text-[18px] md:text-[20px] lg:text-[30px] text-white font-semibold -mt-2 md:-mt-3 pl-4 h-16 md:pl-16">
            คนหากิจกรรมที่คุณสนใจ
          </p>
        </div>
        <div>
          <h6 className="text-[30px] md:text-[30px] lg:text-[50px] text-white font-semibold pl-4 md:pl-16">
            กิจกรรม
          </h6>
          <div className="p-16 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-rows-3 gap-4 md:gap-6">
            {cardMaps}
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
export default search;
