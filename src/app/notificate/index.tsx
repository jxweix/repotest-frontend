import React, { useState } from 'react';
import { Card, CardBody, Button ,Image } from '@nextui-org/react';
import Images from 'next/image';
import account from '../../../public/icons/account.png';
export default function Notification() {
  const [joinedActivities, setJoinedActivities] = useState([
    { id: 1, name: 'Hiking', image: 'https://i.pinimg.com/564x/a3/75/3d/a3753da6a31b3aa4703308f6dc0d7284.jpg', description: 'Enjoy the beauty of nature while hiking through scenic trails.' },
    { id: 2, name: 'Biking', image: 'https://i.pinimg.com/564x/e9/66/6d/e9666d5c501e64d9c9374698f0776aa0.jpg', description: 'Explore new places and stay active with biking adventures.' },
    { id: 3, name: 'Reading', image: 'https://i.pinimg.com/736x/13/c5/dc/13c5dcaa8d8944daadf9d78d949fa7e3.jpg', description: 'Immerse yourself in captivating stories and expand your imagination through reading.' },
    { id: 4, name: 'Meditation', image: 'https://i.pinimg.com/564x/e6/bb/26/e6bb267c660a0fdda99183e6fc9d2896.jpg', description: 'Find inner peace and balance through meditation practices.' },
    { id: 5, name: 'Cooking', image: 'https://i.pinimg.com/564x/19/67/dd/1967ddeb64c46314f41e085beafd12a8.jpg', description: 'Unleash your culinary creativity and savor delicious meals through cooking.' },
    
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
      <div className="grid grid-rows-1 justify-items-center gap-15">
        <p className="notification grid row-span-1 text-[28px] text-center from-purple-950 font-semibold">Notification - Joined Activities <br /></p><p>please checking Date Time and Place</p>
      </div>

      <div className="show grid lg:grid-cols-4 p-10 md:container md:mx-auto gap-20" style={{ minHeight: '100vh' }}>
        {joinedActivities.map((activity) => (
          <Card
            key={activity.id}
            className="w-[300px] h-[500px] relative bg-grey bg-opacity-30 flip-card gap-20"
            onClick={() => handleActivityClick(activity)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Image
                  removeWrapper
                  alt={`${activity.name} background`}
                  className="z-0 w-[300px] h-[500px] object-cover"
                  src={activity.image}
                />
              </div>
              <div className="flip-card-back">
                <CardBody className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-md gap-5">
                  <div className="text-white text-center">
                    <p className="text-large font-bold">{activity.name}</p>
                  </div>
                  <div className="text-white text-center ">
                    <p className="text-small font-bold">{activity.description}</p>
                  </div>
                  <Button color ="danger" variant="light" onClick={() => handleRemoveClick(activity.id)} >
                    <Images src={account} width={20} alt="icon-noti2" />
                    Delete Activity
                  </Button>
                </CardBody>
              </div>
            </div>
          </Card>
        ))}
        {joinedActivities.length > 0 && (
        <div className="text-center mt-4">
          <Button
            className="fixed bottom-10 right-10"
            color="danger"
            onClick={handleRemoveAllClick}
          >
            Remove All
          </Button>
        </div>
      )}
      </div>
    </div>
  );
}
