"use client"
import './style.css'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardHeader, ScrollShadow, Chip } from '@nextui-org/react';
import { Database } from "@App/types/database.types";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from "next/navigation";
import { Center, RingProgress, Text } from '@mantine/core';
// import getBoard from '@App/actions/getBoard';

function boardHome() {
  const supabase = createClientComponentClient<Database>();
  const [dataCon, setDataCon] = useState<any>([]);
  const [userId, setUserId] = useState<any>([]);
  console.log("🚀 ~ boardHome ~ userId:", userId)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = await supabase.auth.getUser()
        const getUser: any = id.data.user?.id
        console.log("🚀 ~ fetchData ~ getUser:", getUser)

        //เอา getId ส่งไป ai แล้ว fetch ข้อมูลกลับมา
        if (getUser && getUser.length >= 1) {
          const { data: getId } = await supabase
            .from('userConjoin_front')
            .select('*')
            .in('id', [getUser]);
          const mapus = getId?.map((item: any) => (item.No))
          setUserId(mapus)
        }

        const { data: checkId } = await supabase
          .from('userConjoin_front')
          .select('conJoin')
          .eq('id', [getUser]);

        if (checkId && checkId.length > 0) {
          const { data: activity } = await supabase
            .from('activity_show')
            .select('*')
            .in('type_id', checkId[0].conJoin);
          const { data: nametype } = await supabase
            .from('typetbl')
            .select('*')
            .in('type_id', checkId[0].conJoin);

          if (nametype && activity) {
            // setTypeName(nametype)
            const joinData = activity?.map((item1: any) => {
              const match = nametype?.find(
                (item2: any) => item2.type_id === item1.type_id
              );
              return { ...item1, ...match };
            })
            if (joinData) {
              setDataCon(joinData)
            }
          }
        }

      } catch (error: any) {
        console.error('Error fetching data:', error?.message);
      }
    }; fetchData();
  }, []);

  const comimage = dataCon?.map((img: any, i: number) => (
    <Card className='figure' key={i} isFooterBlurred>
      <CardHeader className="Header backdrop-blur">
        <div className='Item-hidden backdrop-contrast-50'>

          <div className='grid grid-cols-3 grid-rows-2 w-[346px]'>
            <div className='grid row-span-2 col-span-2 pl-[10px]'>
              <h4 className="mix-blend-screen font-medium text-[24px] grid items-end pb-1">{img.name}</h4>
              <Chip className='chip mix-blend-overlay'>{img.nametype}</Chip>
            </div>

            {/* <Chip className='chip justify-self-end'>{img.nametype}</Chip> */}
            <div className='row-span-2 grid justify-items-end w-full'>
              <span>
                <RingProgress
                  size={90}
                  thickness={10}
                  roundCaps
                  sections={[{ value: 10, color: 'blue' }]}
                  label={
                    <Text c="blue" fw={700} ta="center" size="xl">
                      40%
                    </Text>
                  }
                />
                <Text ta="center" className='uppercase'>score</Text>
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <Image className='imgcard' src={img.src} alt='photo' width={590} height={590} />
    </Card >
  ));

  const refect = () => {
    router.push('/')
  }

  return (
    <>
      <div>
        <ScrollShadow hideScrollBar>
          <div className='wrapper'>
            <div className='container'>
              {comimage}
            </div>
          </div>
        </ScrollShadow>
      </div>
    </>
  );
}

export default boardHome;