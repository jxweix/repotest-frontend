'use client'
import { Card, CardHeader } from '@nextui-org/react';
import { Database } from "@App/types/database.types";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import '../style.css';

export default function page() {
  const [res, setRes] = useState<any>([]);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchData = async () => {
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

  const comimage = res?.map((img: any, index: number) => (
    <Card className='figure'
      key={index}
      isFooterBlurred
      isPressable
      onPress={() => console.log(`Card number: ${index+1}!`)}
    >
      <CardHeader className="Header backdrop-blur">
        <div className='Item-hidden backdrop-contrast-50'>
          <h4 className="mix-blend-screen font-medium text-[24px]">ชื่อบอร์ด</h4>
          <p className="text-[16px] uppercase font-bold">สถานที่ map</p>
        </div>
      </CardHeader>
      <Image className='imgcard' src={img.src} alt='photo' width={590} height={590} />
    </Card>
  ));
  return (
    <div>
      <div className='grid row-span-1 pl-[8vh] pt-[4vh] max-h-[200px]'>
        <span>
          <p className='text-[60px] font-semibold leading-[35px]'>บอร์ดทั้งหมด</p>
          <p className='text-[32px]'>จัดการแก้ไข บอร์ดทั้งหมดของคุณ</p>
        </span>
      </div>
      <div className='grid row-span-1 mt-[4vh]'>
        <div className='wrapper'>
          <div className='container'>
            {comimage}
          </div>
        </div>
      </div>
    </div>
  )
}