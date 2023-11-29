import React from "react";
import cardphoto from "../api/cardphoto";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link";

function search({ cardphoto }) {
  const cardMaps = cardphoto.mock.map((card, i) => {
    const key = `card-${i}`;
    return (
      <Card key={key} isFooterBlurred radius="lg" className="border-none">
        <Image
          alt="Woman listing to music"
          className="cdphoto"
          src={card.img}
        />
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <p className="text-tiny text-black/80">{card.title}</p>
          <Button
            className="text-tiny text-black bg-black/20"
            variant="flat"
            color="default"
            radius="lg"
            size="sm"
          >
            {card.text}
          </Button>
        </CardFooter>
      </Card>
    );
  });

  return (
    <div className="bgsearch">
      <div className="container mx-auto py-36 px-8">
        <h1>เลือกสิ่งที่คุณสนใจ </h1> <br></br>
        <div className="grid lg:grid-cols-3 gap-6">{cardMaps}</div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/cardphoto");
  const cardphoto = await res.json();
  return { props: { cardphoto } };
};
export default search;
