import Images from 'next/image'
import { useState, useCallback, useEffect, useMemo } from 'react';
import { Carousel, Embla } from '@mantine/carousel';
import { Progress, AspectRatio } from '@mantine/core';
import { Accordion, AccordionItem, User, Link, Input, Button, Dropdown, Image, DropdownTrigger, DropdownMenu, DropdownItem, Card, CardHeader, CardBody } from "@nextui-org/react";
import classes from '../style/style.module.css';

import Kj from '../../../../../public/images/bkPage-1.jpg'
import Iconell from '../../../../../public/icons/Iconellipses.png'
import Iconsend from '../../../../../public/icons/Iconsend.png'
const allComments = [
    {
        user: "Jxweix",
        link: "https://www.instagram.com/jxweix/",
        link_name: "@jxweix",
        pic: "https://avatars.githubusercontent.com/u/30373425?v=4"
    },
    {
        user: "awaken",
        link: "https://www.instagram.com/jxweix/",
        link_name: "@awaken",
        pic: "https://avatars.githubusercontent.com/u/30373425?v=4"
    },
    {
        user: "coluxz",
        link: "https://www.instagram.com/jxweix/",
        link_name: "@coluxz",
        pic: "https://avatars.githubusercontent.com/u/30373425?v=4"
    },
]

const allCard = [
    {
        boardName: "name_1",
        mapName: "name_map_1",
        src: "https://i.pinimg.com/564x/5d/7f/13/5d7f134a0f55ef5319e3c23dac63ee14.jpg",
        width: 570,
    },
    {
        boardName: "name_1",
        mapName: "name_map_1",
        src: "https://i.pinimg.com/564x/e1/ec/92/e1ec9214f81b3133621c5c43a3fb9757.jpg",
        width: 570,
    },
    {
        boardName: "name_1",
        mapName: "name_map_1",
        src: "https://i.pinimg.com/564x/fa/22/4c/fa224ca4f8f8eefce166c3068bcd15ef.jpg",
        width: 570,
    },
]

const MapCard = allCard.map((card) => (
    <Card className="py-4 mx-[3vh] w-auto">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">{card.boardName}</h4>
            <p className="text-tiny uppercase font-bold">{card.mapName}</p>
            <small className="text-default-500">tag</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
            <Image
                alt={card.boardName}
                className="object-cover rounded-xl"
                src={card.src}
                width={card.width}
                height={450}
            />
        </CardBody>
    </Card>
))

export default function detail() {
    const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));
    const [comment, setComment] = useState(allComments)
    const [scrollProgress, setScrollProgress] = useState(0);
    const [embla, setEmbla] = useState(null);

    const size = [
        {
            src: Kj,
            height: '446px',
        },
        {
            src: Kj,
            height: '446px',
        },
        {
            src: Kj,
            height: '446px',
        },
    ]

    const handleScroll = useCallback(() => {
        if (!embla) return;
        const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
        setScrollProgress(progress * 100);
    }, [embla, setScrollProgress]);

    useEffect(() => {
        if (embla) {
            embla.on('scroll', handleScroll);
            handleScroll();
        }
    }, [embla]);

    const testmap = size.map((photo, i) => (
        <Carousel.Slide>
            <Images
                className='rounded-[27px]'
                src={photo.src}
                placeholder="blur"
                loading="lazy"
                // sizes={750}
                // width={photo.width}
                // height={photo.height}
                alt='photo'
            />
        </Carousel.Slide>
    ))

    const handleDeleteComment = (i) => {
        const updatedComments = [...comment];
        updatedComments.splice(i, 1);
        setComment(updatedComments);
    };

    const comments = useMemo(() => {
        return comment.map((item, i) => {
            const key = `comment-${i}`
            return (
                <div className='grid grid-cols-2 grid-rows-1 '>
                    <div className='justify-start items-start'>
                        <User
                            key={key}
                            name={item.user}
                            description={(
                                <Link className='text-[#d1d1d1]' href={item.link} size="sm" isExternal>
                                    {item.link_name}
                                </Link>
                            )}
                            avatarProps={{
                                src: item.pic
                            }}
                        />
                    </div>
                    <div className='grid pr-[20px] justify-items-end items-center'>
                        <Dropdown>
                            <DropdownTrigger>
                                <Images src={Iconell} width={20} height={5} radius={13} alt='ell' />
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    key="delete"
                                    className="text-danger items-center"
                                    color="danger"
                                    onClick={() => handleDeleteComment(i)}
                                >
                                    delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            )
        })
    }, [comment])

    return (
        <div>
            <div className='BG-page123 h-auto pt-[10vh]'>
                <div className='grid mx-[10vh] rounded-[27px] justify-items-center grid-rows-2 grid-cols-2 bg-white'>
                    <div className='grid rounded-[30px] justify-items-center w-full pt-10'>
                        <div className='w-[750px]'>
                            <Carousel
                                classNames={classes}
                                radius={30}
                                // dragFree
                                slideSize="95%"
                                slideGap="lg"
                                width={750}
                                height={446}
                                getEmblaApi={setEmbla}
                            >
                                {testmap}
                            </Carousel>
                            <Progress
                                value={scrollProgress}
                                max={320}
                                size="sm"
                                mt="xl"
                                mx="auto"
                            />
                        </div>
                    </div>
                    <div className='grid pl-[60px] grid-rows-5 w-full'>
                        <div className='grid row-span-3 items-end justify-items-start'>
                            <span>
                                <p className='text-[30px]'>วาดรูปที่ถนนกันเถอะ </p>
                                <p>ไปวาดรูปรับลมที่ถนน ชมวิวรับควันรถบนถนน สร้างประสบการณ์ใหม่</p>
                            </span>
                        </div>
                        <div className='grid pt-6 row-span-2 items-start justify-items-start'>
                            <span className='flex'>
                                <div className='flex-auto w-[37rem] justify-items-start'>
                                    <User
                                        // key={key}
                                        name={"KJ-Jxweix"}
                                        description={(<p>@KJ-jxweix</p>)}
                                        avatarProps={{
                                            src: 'https://i.pinimg.com/236x/93/6a/6a/936a6a82f4967f4b4513be8d3a40e218.jpg'
                                        }}
                                    />
                                </div>
                                <div className='flex-auto justify-items-end'>
                                    <Button className='rounded-full w-[150px]'>เข้าร่วม</Button>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className='rounded-lg grid justify-items-center pb-10 pt-0'>
                        <p className='my-[20px]'>เส้นทางเข้าผ่าน Google Map</p>
                        <div className='w-[750px] max-h-[446px]'>
                            <AspectRatio ratio={16 / 9} >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.3063874233135!2d-74.04668908358428!3d40.68924937933441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25090129c363d%3A0x40c6a5770d25022b!2sStatue%20of%20Liberty%20National%20Monument!5e0!3m2!1sen!2sru!4v1644262070010!5m2!1sen!2sru"
                                    title="Google map"
                                    style={{ border: 0, borderRadius: 27 }}
                                />
                            </AspectRatio>
                        </div>
                    </div>
                    <div className='rounded-lg p-[3vh]'>
                        <Accordion
                            className='w-full min-w-[788px]'
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedKeys}
                        >
                            <AccordionItem className='text-[24px]' key="1" title="ความคิดเห็น">
                                <div className='overflow-y-auto h-[300px]'>
                                    {comments}
                                </div>
                            </AccordionItem>
                        </Accordion>
                        <div className='grid grid-rows-1 grid-cols-10 items-center'>
                            <div className='grid pr-1 justify-end items-center'>
                                <User
                                    avatarProps={{
                                        src: 'https://i.pravatar.cc/150?u=a04258114e29026702d'
                                    }}
                                />
                            </div>
                            <div className='grid col-span-8'>
                                <Input type="text" placeholder="เพิ่มความคิดเห็น" radius='full' size='sm' />
                            </div>
                            <div className='grid items-center'>
                                <Button
                                    isIconOnly
                                    className='pt-1 ml-[15px]'
                                    radius='full'
                                    color='secondary'
                                    onClick={() => {
                                        setComment(prev => [...prev, {
                                            user: "123",
                                            link: "123",
                                            link_name: " dsad",
                                            pic: "https://avatars.githubusercontent.com/u/30373425?v=4"
                                        }])
                                    }}>
                                    <Images src={Iconsend} width={30} height={15} alt='send' />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-auto py-[3vh]'>
                    <div className='grid justify-items-center'>
                        <p className='text-[30px] text-white'> บอร์ดอื่นๆ ที่แนะนำ</p>
                        <div className='grid grid-rows-1 grid-cols-3 mx-[10vh] mt-[30px] gap-7'>
                            {MapCard}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
