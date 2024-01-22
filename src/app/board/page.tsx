"use client"
import './style.css'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Card, CardHeader, ScrollShadow } from '@nextui-org/react';
import { Database } from "@App/types/database.types";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import getBoard from '@App/actions/getBoard';

function boardHome() {
  const [res, setRes] = useState<any>([]);
  const supabase = createClientComponentClient<Database>();
  const [getUserid, setGetUserid] = useState<String>();

  useEffect(() => {
    const fetchData = async () => {

      const id = await supabase.auth.getUser()
            if (id) {
                const data = id.data.user?.id
                setGetUserid(data)
            }
            // if (id.data.user?.id) {
            //     const dataApi = await getBoard(id.data.user?.id)
            //     console.log("dataApi::!", dataApi);
            // }

      try {
        let { data: testCreate } = await supabase
          .from('testCreate')
          .select('src');
        if (testCreate) {
          setRes(testCreate)
        }

      } catch (error: any) {
        console.error('Error fetching data:', error?.message);
      }
    }; fetchData();
  }, []);

  const comimage = res?.map((img: any, i: number) => (
    <Card className='figure' key={i} isFooterBlurred>
      <CardHeader className="Header backdrop-blur">
        <div className='Item-hidden backdrop-contrast-50'>
          <h4 className="mix-blend-screen font-medium text-[24px]">ชื่อบอร์ด</h4>
          <p className="text-[16px] uppercase font-bold">สถานที่ map</p>
        </div>
      </CardHeader>
      <Image className='imgcard' src={img.src} alt='photo' width={590} height={590} />
    </Card >
  ));

  return (
    <div>
      <ScrollShadow hideScrollBar>
        <div className='wrapper'>
          <div className='container'>
            {comimage}
          </div>
        </div>
      </ScrollShadow>
    </div>
  );
}

export default boardHome;