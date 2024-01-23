"use client"
import './style.css'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardHeader, ScrollShadow, Chip } from '@nextui-org/react';
import { Database } from "@App/types/database.types";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from "next/navigation";
// import getBoard from '@App/actions/getBoard';

function boardHome() {
  const supabase = createClientComponentClient<Database>();
  const [getUserid, setGetUserid] = useState<any>([]);
  const [dataCon, setDataCon] = useState<any>([]);
  const router = useRouter()
  console.log("🚀 ~ boardHome ~ dataCon:", dataCon)
  // const [typeName, setTypeName] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let id = await supabase.auth.getUser()
        setGetUserid(id.data.user?.id)

        if (getUserid) {
          const { data: checkId } = await supabase
            .from('userConjoin_front')
            .select('conJoin')
            .eq('id', getUserid);
          console.log("🚀 ~ fetchData ~ checkId:", checkId)

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
              console.log("🚀 ~ fetchData ~ activity in if:", activity)

              console.log("🚀 ~ fetchData ~ nametype:", nametype)
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
        }


      } catch (error: any) {
        console.error('Error fetching data:', error?.message);
      }
    }; fetchData();
  }, [getUserid]);

  const comimage = dataCon?.map((img: any, i: number) => (
    <Card className='figure' key={i} isFooterBlurred>
      <CardHeader className="Header backdrop-blur">
        <div className='Item-hidden backdrop-contrast-50'>
          <h4 className="mix-blend-screen font-medium text-[24px]">{img.name}</h4>
          {/* <p className="text-[16px] uppercase font-bold">{img.nametype}</p> */}
          <Chip isDisabled className='chip'>{img.nametype}</Chip>
        </div>
      </CardHeader>
      <Image className='imgcard' src={img.src} alt='photo' width={590} height={590} />
    </Card >
  ));

  const refect = () => {
    router.push('/')
    window.location.reload();
  }

  return (
    <>
      {getUserid ? (
        <div>
          <ScrollShadow hideScrollBar>
            <div className='wrapper'>
              <div className='container'>
                {comimage}
              </div>
            </div>
          </ScrollShadow>
        </div>
      ) : refect()}
    </>
  );
}

export default boardHome;