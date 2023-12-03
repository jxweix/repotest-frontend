"use client"
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import Images from "next/image";
import Link from "next/link";
import { useState } from "react";
import iconc from "../../../public/icons/icon-c.png";

export default function Notification() {
  const [joinedActivities, setJoinedActivities] = useState([
    {
      id: 1,
      name: "วันที่ 11/27/2023 08:30 น.",
      image: getRandomPhoto(),
      description: "ไปเรียน",
    },
    {
      id: 2,
      name: "วันที่ 11/27/2023 11:50 น.",
      image: getRandomPhoto(),
      description: "ไปตีแบด",
    },
    {
      id: 3,
      name: "วันที่ 11/27/2023 17:00 น.",
      image: getRandomPhoto(),
      description: "กลับบ้าน",
    },
    {
      id: 4,
      name: "วันที่ 11/27/2023 17:00 น.",
      image: getRandomPhoto(),
      description: "กลับบ้าน",
    },
    {
      id: 5,
      name: "วันที่ 11/27/2023 17:00 น.",
      image: getRandomPhoto(),
      description: "กลับบ้าน",
    },
    {
      id: 6,
      name: "วันที่ 11/27/2023 17:00 น.",
      image: getRandomPhoto(),
      description: "กลับบ้าน",
    },
  ]);

  function getRandomPhoto() {
    const photoNames = [
      "noti1.jpg",
      "noti2.jpg",
      "noti3.jpg",
      "noti4.jpg",
      "noti5.jpg",
      "noti6.jpg",
      "noti7.jpg",
      "noti8.jpg",
      "noti9.jpg",
      "noti10.jpg",
      "noti11.jpg",
      "noti12.jpg",
      "noti13.jpg",
    ];
    const randomIndex = Math.floor(Math.random() * photoNames.length);
    return `/photo/${photoNames[randomIndex]}`;
  }

  const handleActivityClick = (activity: (typeof joinedActivities)[number]) => {
    alert(`You selected: ${activity.name}`);
  };

  const handleRemoveClick = (activityId: number) => {
    setJoinedActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== activityId)
    );
  };

  const handleRemoveAllClick = () => {
    setJoinedActivities([]);
  };

  return (
    <div className="notification-page">
      <div className="md:container md:mx-auto pt-6">
        <p className="text-[40px] md:text-[60px] text-white font-semibold mb-4 md:mb-0">
          การแจ้งเตือน
        </p>
        <p className="text-[14px] md:text-[20px] text-white font-semibold -mt-6 mb-4 md:h-20 2xl:md:h-20">
          ตรวจสอบกิจกรรม วันเวลาของคุณ และการนัดหมายที่คุณรอคอย
        </p>
        <div
          className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3
        md:h-auto md:mx-auto 2xl:mx-auto 
        gap-12 lg:gap-12 md:gap-12 2xl:gap-4
        justify-items-center "
          style={{ minHeight: "100vh" }}
        >
          {joinedActivities.map((activity) => (
            <Card
              key={activity.id}
              className="w-[200px] h-[250px] md:w-80 md:h-[350px] pl:w-60 pl:h-[150px] 2xl:w-3/4 2xl:h-[400px] rounded-3xl"
              onClick={() => handleActivityClick(activity)}
            >
              <div className="">
                <div className="">
                  <Image
                    removeWrapper
                    alt={`${activity.name} background`}
                    className="z-0 w-full  object-cover "
                    src={activity.image}
                  />
                </div>
                <div>
                  <CardFooter className="justify-between before:bg-white/30 border-white/40 bg-black/50 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 shadow-2xl w-[160px] h-[60px] md:w-[280px] md:h-[80px]  lg:h-[100px] 2xl:w-[340px] mx-5 z-10">
                    <p className="text-center font-normal text-[10px] md:text-[20px]  2xl:text-[24px] text-white">
                      {activity.name}
                      <b className="pl-2">{activity.description}</b>
                    </p>
                    <Link href="/search">
                      <Button className=" sm:w-[60px] sm:h-[40px] md:w-[80px] md:h-[60px] 2xl:w-[100px] 2xl:h-[80px] font-semibold text-white bg-black/60">
                        <p className="sm:text-[16px] md:text-[18px] lg:text-[24px] 2xl:text-[32px] font-normal">
                          {" "}
                          Map{" "}
                        </p>
                      </Button>
                    </Link>
                  </CardFooter>
                  <Button
                    className="absolute top-0 right-0 bg-transparent pl-8 mt-5 mr-1 "
                    onClick={() => handleRemoveClick(activity.id)}
                  >
                    <Images src={iconc} width={35} alt="icon-noti2" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {joinedActivities.length > 0 && (
            <div className="text-center">
              <Button
                className="bg-white font-semibold fixed top-24 right-10  w-[120px] h-[30px] sm:w-[140px] sm:h-[40px] md:w-[200px] md:h-[50px] "
                text-corlor="black"
                onClick={handleRemoveAllClick}
              >
                <p className="drop-shadow-2xl text-[12px] sm:text-[14px] md:text-[16px]">
                  {" "}
                  ลบการแจ้งเตือนทั้งหมด{" "}
                </p>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
