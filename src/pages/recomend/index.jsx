// src/recommend/index.jsx
import React from 'react';
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';

export default function Recommend() {
  const activities = [
    { name: 'Hiking', image: 'https://i.pinimg.com/564x/a3/75/3d/a3753da6a31b3aa4703308f6dc0d7284.jpg' },
    { name: 'Biking', image: 'https://i.pinimg.com/564x/e9/66/6d/e9666d5c501e64d9c9374698f0776aa0.jpg' },
    { name: 'Reading', image: 'https://i.pinimg.com/736x/13/c5/dc/13c5dcaa8d8944daadf9d78d949fa7e3.jpg' },
    { name: 'Meditation', image: 'https://i.pinimg.com/564x/e6/bb/26/e6bb267c660a0fdda99183e6fc9d2896.jpg' },
    { name: 'Cooking', image: 'https://i.pinimg.com/564x/19/67/dd/1967ddeb64c46314f41e085beafd12a8.jpg' },
    { name: 'Yoga', image: 'https://i.pinimg.com/564x/d7/c8/a0/d7c8a0ff9dd1d695e58e0288f1ce7e0f.jpg' },
    { name: 'Painting', image: 'https://i.pinimg.com/564x/ed/dd/51/eddd515fa7790191a228fad0955a5300.jpg' },
    { name: 'Gardening', image: 'https://i.pinimg.com/564x/41/17/05/4117052086888f8f4f34f54ce4bedc36.jpg' },
    { name: 'Running', image: 'https://i.pinimg.com/564x/55/15/47/551547d869166af7685c309bcb11a8b6.jpg' },
    { name: 'Swimming', image: 'https://i.pinimg.com/564x/54/d9/aa/54d9aac6a01f3ea05ae4b09268141dd3.jpg' },
  ];

  const handleActivityClick = (activity) => {
    alert(`You selected: ${activity.name}`);
  };

  return (
    <div className="max-w-[900px] mx-auto gap-2 grid grid-cols-4 px-8 text-center">
      {/* Set background image for the entire page */}
      <style jsx global>{`
        body {
          background-image: url('/images/bkPage.jpg');
          background-size: cover;
          background-repeat: no-repeat;
        }
      `}</style>

      {activities.map((activity, index) => (
        <Card
          key={index}
          className="h-[300px] relative"
          onClick={() => handleActivityClick(activity)}
          style={{ cursor: 'pointer' }}
        >
          <Image
            removeWrapper
            alt={`${activity.name} background`}
            className="z-0 w-full h-full object-cover"
            src={activity.image}
          />
          {/* Details on hover */}
          <CardBody className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-white text-center">
              <p className="text-base font-bold">{activity.name}</p>
              {/* Add more details or customize the information displayed */}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
