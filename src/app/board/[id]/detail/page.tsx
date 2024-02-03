"use client";
import { Carousel } from "@mantine/carousel";
import {
  Button,
  Card,
  CardHeader,
  Chip,
  Image,
  User,
} from "@nextui-org/react";
import Images from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@App/types/database.types";
import classes from '../style/style.module.css';
import { RingProgress, Text } from "@mantine/core";
import iconGather from '../../../../../public/icons/icon-gather.png'
import iconBack from '../../../../../public/icons/angle-left.png'

function shuffleArray(array: any[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function detail() {
  const path = useParams()
  const supabase = createClientComponentClient<Database>();
  const [dataBoard, setDataBoard] = useState<any>([]);
  const [dataAi, setDataAi] = useState<any>([]);
  const [dataGather, setDataGather] = useState<any>([]);
  const router = useRouter();

  const headleClickLink = () => {
    const GatherSrc = dataGather.map((item: any) => item.link.gatherlink)
    window.open(GatherSrc, '_blank')
  }

  useEffect(() => {
    (async () => {
      const dataUser = await supabase.auth.getUser()
      const getUserId: any = dataUser.data.user?.id;
      let { data: gettype } = await supabase
        .from('activity_show')
        .select(`id , type_id , name  , link:typetbl(gatherlink)`)
        .eq('id', [path.id])
      if (gettype) {
        setDataGather(gettype)
      }
      if (path && getUserId) {
        let { data: dataCon } = await supabase
          .from('userConjoin_front')
          .select(`*`)
          .in('id', [getUserId])
        let { data: datalegth } = await supabase
          .from('userConjoin_front')
          .select(`*`)
        const Userlength: number | any = datalegth?.length;

        if (dataCon) {
          const UserNo = dataCon[0]?.No
          const datafetch = await fetch(`https://repotest-backend.onrender.com/user_id/${UserNo}`)
          const dataAi = await datafetch.json()
          const sortedDataAi = [...dataAi].sort((a, b) => b.score - a.score);
          const topScores = sortedDataAi.slice(0, 3);
          let { data: dataBoard } = await supabase
            .from('activity_show')
            .select(`* , typetbl(nametype)`)
            .in('type_id', topScores.map((item: any) => (item.type_id)))
          if (dataBoard) {
            const joinData = dataBoard?.map((item1: any) => {
              const match = topScores?.find(
                (item2: any) => item2.type_id === item1.type_id
              );
              return { ...item1, ...match };
            });
            if (joinData) {
              const scoreItem = joinData.map((item: any) => ({
                ...item,
                score: (item.score / Userlength) * 100,
              }));
              const randomData = shuffleArray(scoreItem);
              const recoment = randomData.slice(0, 3).sort((a, b) => b.score - a.score);;
              setDataAi(recoment)
            }
          }
        }

        let { data: datafetch } = await supabase
          .from('activity_show')
          .select(`*,userInfo:user_test(*)`)
          .in('id', [path.id])
        if (datafetch && datafetch.length > 0) {
          setDataBoard(datafetch)
        }
      }
    })()
  }, []);

  const handPressable = (item: any) => {
    router.push(`/board/${item.id}/detail`)
  }

  const pythonCard = dataAi?.map((img: any, i: number) => (
    <Card className="relative max-h-[710px] rounded-[27px]" key={i} isFooterBlurred isPressable onPress={() => handPressable(img)}>
      <CardHeader className="absolute z-20 backdrop-blur-sm backdrop-contrast-50 w-full">
        <div className="grid grid-cols-3 grid-rows-2 w-full">
          <div className="grid row-span-2 col-span-2 pl-[10px]">
            <h4 className="mix-blend-screen font-medium text-[24px] grid items-end text-[#fff] text-left pb-1">{img.name}</h4>
            <Chip className="bg-[#3d02aaa1]/50 text-[#fff] mix-blend-overlay">{img.typetbl.nametype}</Chip>
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
              <Text ta="center" className="uppercase text-[#fff]">
                Top Rate
              </Text>
            </span>
          </div>
        </div>
      </CardHeader>
      <Image
        className="h-full min-h-[590px] bg-center"
        src={img.src}
        alt="photo"
        width={590}
        height={590}
      />
    </Card>
  ));

  const groupPhoto = dataBoard[0]?.srcGroup?.map((src: string, i: number) => (
    <Carousel.Slide key={i}>
      <Image
        className="rounded-[23px]"
        src={src}
        placeholder="blur"
        loading="lazy"
        alt={`photo-${i}`}
      />
    </Carousel.Slide>
  ));

  if (dataBoard && pythonCard && dataBoard.length !== 0 && pythonCard.length !== 0) {
    return (
      <div>
        <div className="BG-page123 h-auto pt-[5vh]">
          <div className="grid xl:mx-[10vh] lg:mx-[3vh] md:mx-0 rounded-[27px] justify-items-center xl:grid-cols-2 lg:grid-cols-2 bg-white">
            <div className="grid w-full py-5">
              <Carousel
                classNames={classes}
                withIndicators
                // dragFree
                // slideSize="95%"
                slideSize={"95%"}
                slideGap="xl"
                controlsOffset="xl"
                controlSize={40}
                height={"100%"}
              >
                {groupPhoto}
              </Carousel>
            </div>
            <div className="grid px-[5vh] grid-rows-5 w-full">
              <div className="grid row-span-1 items-start justify-items-end pt-[2vh]">
                <Button isIconOnly className="rounded-full right-[-3vh]" variant="light" onClick={() => router.push('/board')}>
                  <Images className="pr-1" src={iconBack} alt="icon" width={25} height={25} />
                </Button>
              </div>
              <div className="grid row-span-1 items-end justify-items-start">
                <span className="py-[2vh]">
                  <p className="text-[30px]">{dataBoard[0].name}</p>
                  <p>
                    {dataBoard[0].detail}
                  </p>
                </span>
              </div>
              <div className="grid pt-6 row-span-1 items-start justify-items-start">
                <span className="grid grid-cols-2 grid-rows-1 w-full">
                  <div className="grid justify-items-start">
                    <User
                      // key={key}
                      name={dataBoard[0]?.userInfo?.user_name}
                      description={<p>@{dataBoard[0]?.userInfo?.user_name}</p>}
                      avatarProps={{
                        src: "https://i.pinimg.com/236x/93/6a/6a/936a6a82f4967f4b4513be8d3a40e218.jpg",
                      }}
                    />
                  </div>
                  <div className="grid justify-items-end">
                    {/* <Button className="rounded-full w-[150px]">เข้าร่วม</Button> */}
                  </div>
                </span>
              </div>
              <div className="grid py-[2vh]">
                <Button className="bg-[#3A3DAB] rounded-full h-[48px] items-center text-[#fff]"
                  endContent={
                    <Images className="rounded-full"
                      src={iconGather}
                      width={30} height={30} alt="icon-gather" />
                  }
                  onClick={(() => headleClickLink())}
                >
                  Go to Gathaer.town
                </Button>
              </div>
            </div>
          </div>
          <div className="h-auto py-[3vh]">
            <div className="grid justify-items-center ">
              <p className="text-[30px] text-white"> บอร์ดอื่นๆ ที่แนะนำ</p>
              <div className="grid md:grid-rows-3 md:grid-cols-1 lg:grid-rows-1 lg:grid-cols-3  xl:mx-[9vh] lg:mx-0 md:mx-[2vh] mt-[30px] gap-7">
                {pythonCard}
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}