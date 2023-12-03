"use client"
import { Card, CardBody, Image } from "@nextui-org/react";

export default function Recommend() {
  const activities = [
    {
      name: "Hiking",
      image:
        "https://i.pinimg.com/564x/a3/75/3d/a3753da6a31b3aa4703308f6dc0d7284.jpg",
      description:
        "Enjoy the beauty of nature while hiking through scenic trails.",
    },
    {
      name: "Biking",
      image:
        "https://i.pinimg.com/564x/e9/66/6d/e9666d5c501e64d9c9374698f0776aa0.jpg",
      description: "Explore new places and stay active with biking adventures.",
    },
    {
      name: "Reading",
      image:
        "https://i.pinimg.com/736x/13/c5/dc/13c5dcaa8d8944daadf9d78d949fa7e3.jpg",
      description:
        "Immerse yourself in captivating stories and expand your imagination through reading.",
    },
    {
      name: "Meditation",
      image:
        "https://i.pinimg.com/564x/e6/bb/26/e6bb267c660a0fdda99183e6fc9d2896.jpg",
      description: "Find inner peace and balance through meditation practices.",
    },
    {
      name: "Cooking",
      image:
        "https://i.pinimg.com/564x/19/67/dd/1967ddeb64c46314f41e085beafd12a8.jpg",
      description:
        "Unleash your culinary creativity and savor delicious meals through cooking.",
    },
    {
      name: "Yoga",
      image:
        "https://i.pinimg.com/564x/d7/c8/a0/d7c8a0ff9dd1d695e58e0288f1ce7e0f.jpg",
      description:
        "Nurture your mind and body with the harmonizing practice of yoga.",
    },
    {
      name: "Painting",
      image:
        "https://i.pinimg.com/564x/ed/dd/51/eddd515fa7790191a228fad0955a5300.jpg",
      description:
        "Express yourself through vibrant strokes and create beautiful paintings.",
    },
    {
      name: "Gardening",
      image:
        "https://i.pinimg.com/564x/41/17/05/4117052086888f8f4f34f54ce4bedc36.jpg",
      description:
        "Connect with nature and cultivate a colorful garden full of life.",
    },
    {
      name: "Running",
      image:
        "https://i.pinimg.com/564x/55/15/47/551547d869166af7685c309bcb11a8b6.jpg",
      description:
        "Boost your endurance and embrace the freedom of running through diverse landscapes.",
    },
    {
      name: "Swimming",
      image:
        "https://i.pinimg.com/564x/54/d9/aa/54d9aac6a01f3ea05ae4b09268141dd3.jpg",
      description:
        "Dive into refreshing waters and enjoy the invigorating experience of swimming.",
    },
    {
      name: "Photography",
      image:
        "https://i.pinimg.com/564x/1f/af/fa/1faffa6eeff539a9ca13b4d9af4c4018.jpg",
      description:
        "Capture memorable moments and explore the art of photography.",
    },
    {
      name: "Gaming",
      image:
        "https://i.pinimg.com/564x/bd/11/0c/bd110c6612e1b0b7a99da4d836d0e5e5.jpg",
      description:
        "Immerse yourself in virtual worlds and enjoy the excitement of gaming.",
    },
  ];

  const handleActivityClick = (activity: (typeof activities)[number]) => {
    alert(`You selected: ${activity.name}`);
  };

  return (
    <div className="bg">
      <div className="grid grid-rows- justify-items-center gap-20">
        <p className="recommend grid row-span-1 text-[32px] text-center from-purple-950 font-semibold">
          Recommend Activities For You
        </p>
      </div>

      <div className="show grid lg:grid-cols-4 p-10 md:container md:mx-auto gap-20">
        {activities.map((activity, index) => (
          <Card
            key={index}
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
                <CardBody className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-md ">
                  <div className="text-white text-center">
                    <p className="text-large font-bold">{activity.name}</p>
                    {/* Add more details or customize the information displayed */}
                  </div>
                  <div className="text-white text-center">
                    <p className="text-small font-bold">
                      {activity.description}
                    </p>
                    {/* Add more details or customize the information displayed */}
                  </div>
                </CardBody>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
