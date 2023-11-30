import React, { useState } from 'react';
import { Card, CardBody, Button, Image, CardFooter, link } from '@nextui-org/react';
import Images from 'next/image';
import iconc from '../../../public/icons/icon-c.png';
import Link from 'next/link';


export default function Notification() {
  const [joinedActivities, setJoinedActivities] = useState([
    { id: 1, name: 'วันที่ 11/27/2023 10:30 น.', image: '/photo/gojosocute.jpg', description: 'ไปเล่นเกม' },
    { id: 2, name: 'วันที่ 11/27/2023 10:30 น.', image: '/photo/gojosocute.jpg', description: 'ไปวิ่งว่าว' },
    { id: 3, name: 'วันที่ 11/27/2023 10:30 น.', image: '/photo/gojosocute.jpg', description: 'ไปชักว่าว' },

  ]);

  const handleActivityClick = (activity) => {
    alert(`You selected: ${activity.name}`);
  };

  const handleRemoveClick = (activityId) => {
    setJoinedActivities((prevActivities) => prevActivities.filter((activity) => activity.id !== activityId));
  };

  const handleRemoveAllClick = () => {
    setJoinedActivities([]);
  };

  return (
    <div className="notification-page">
      <div className="md:container md:mx-auto pl-20 pt-6">
        <p className="text-[60px] text-white font-semibold ">การแจ้งเตือน</p>
        <p className="text-[20px] text-white font-semibold -mt-6  h-20">ตรวจสอบกิจกรรม วันเวลาของคุณ และการนัดหมายที่คุณรอคอย</p>
        <div className="grid lg:grid-cols-3  md:container md:mx-auto gap-20" style={{ minHeight: '100vh' }}>
          {joinedActivities.map((activity) => (
            <Card
              key={activity.id}
              className="w-[400px] h-[500px] rounded-3xl"
              onClick={() => handleActivityClick(activity)}
            >
              <div className="">
                <div className="">
                  <Image
                    removeWrapper
                    alt={`${activity.name} background`}
                    className="z-0 w-[400px] h-[500px] object-cover "
                    src={activity.image}
                  />
                </div>
                <div>
                  <CardFooter className="justify-between before:bg-white/20 border-white/30 bg-black/40 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 shadow-small w-auto mx-5 z-10">
                    <p className="text-center font-normal text-[24px] text-white">{activity.name}<b className='pl-2'>{activity.description}</b></p>
                    <Link href="/search">
                      <Button className="w-[100px] h-[80px] font-semibold text-white bg-black/60">
                        <p className='text-[26px] font-normal'> Map </p>
                      </Button>
                    </Link>
                  </CardFooter>
                  <Button className="absolute top-0 right-0 bg-transparent pl-8 mt-5 mr-1 " onClick={() => handleRemoveClick(activity.id)} >
                    <Images src={iconc} width={35} alt="icon-noti2" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {joinedActivities.length > 0 && (
            <div className="text-center mt-4">
              <Button
                className="bg-white font-semibold text-[20px] fixed bottom-10 right-10 w-[250px] h-[60px] mr-40 drop-shadow-2xl"
                text-corlor="black"
                onClick={handleRemoveAllClick}
              >
                <p className='drop-shadow-2xl'> ลบการแจ้งเตือนทั้งหมด </p>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
