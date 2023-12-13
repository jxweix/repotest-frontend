'use client'
import React, { useEffect, useState } from 'react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import Image from 'next/image';
import { Textarea } from "@nextui-org/react";
import Snowfall from '@App/components/snowfall/Snowfall';


export default function addboard() {


  const [image, setImage] = useState<any>([{}]);
  const [createObjectURL, setCreateObjectURL] = useState<any>([]);
  const [formData, setFormData] = useState({

    nameboard: '',
    detail: '',
    tag: '',
  });

  const items = [
    { value: 1, label: 'one' },
    { value: 2, label: 'two' },
    { value: 3, label: 'three' },
  ];

  useEffect(() => {
    return () => {
      createObjectURL.forEach((url: any) => URL.revokeObjectURL(url));
    };
  }, [createObjectURL]);

  const uploadToClient = (event: any) => {
    const i = event?.target?.files?.[0];
    if (i) {
      setImage(i)
      const newObjectURL = URL.createObjectURL(i);
      setCreateObjectURL((prevObjectURLs: any) => [...prevObjectURLs, newObjectURL]);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/your-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application               /json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json(); // ดึงข้อมูลที่ถูกส่งกลับมาจากเซิร์ฟเวอร์
        console.log('Server response:', responseData); // log ข้อมูลที่ถูกส่งกลับมาจากเซิร์ฟเวอร์
        console.log('Data sent successfully!');
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='bgsearch'>
      <Snowfall numSnowflakes={50} />
      <div className='md:container md:mx-auto pt-6'>
        <div className='grid grid-row-3'>
          <p className="text-[40px] md:text-[60px] text-gray-700 font-semibold mb-4 md:mb-0 pr-96">
            สร้างบอร์ด
          </p>
          <p className="text-[14px] md:text-[20px] text-gray-700 font-semibold -mt-6 mb-4 md:h-20 2xl:md:h-20">
            สร้างบอร์ดเพื่อให้ผู้ใช้งานอื่น ๆ เข้าร่วมกิจกรรมของคุณได้
          </p>
        </div>
        <div className='wrapper pb-96'>
          <div className='createContainer border-1 border-black p-4 rounded-[27px] '>
            <div className='grid grid-cols-2'>
              <div className='grid p-2 gap-2 justify-items-center'>
                <Input type="file" name="myImage" onChange={uploadToClient}> </Input>
                {createObjectURL.map((img: any, i: number) => (
                  <Image key={i} src={img} alt={`Object URL ${i}`} width={150} height={200} />
                ))}
              </div>
              <div className='grid p-2 gap-5'>
                <Input
                  type="input"
                  label="ชื่อบอร์ด"
                  variant="underlined"
                  labelPlacement={'outside'}
                  placeholder="ชื่อบอร์ดของคุณ"
                  onChange={handleInputChange}
                />
                <Textarea
                  label="คำอธิบาย"
                  maxRows={3}
                  variant="underlined"
                  labelPlacement="outside"
                  placeholder="ใส่รายละเอียดของบอร์ด"
                  onChange={handleInputChange}
                  classNames={{
                    base: "max-w-xs",
                    input: "resize-y min-h-[40px]",
                  }}
                />
                <Input
                  type="date"
                  label="วันที่"
                  variant="underlined"
                  labelPlacement={'outside'}
                  placeholder="ชื่อบอร์ด"
                  onChange={handleInputChange}
                />
                <div className='grid grid-cols-2 gap-2'>
                <Input
                  type="time"
                  label="เวลาเริ่มกิจกรรม"
                  variant="underlined"
                  labelPlacement={'outside'}
                  placeholder="เวลาเริ่มกิจกรรม"
                  onChange={handleInputChange}
                />
                <Input
                  type="time"
                  label="สิ้นสุดเวลากิจกรรม"
                  variant="underlined"
                  labelPlacement={'outside'}
                  placeholder="ชื่อบอร์ด"
                  onChange={handleInputChange}
                />
                </div>
                <Select
                  name='tag'
                  size='sm'
                  label='เลือกหัวข้อของบอร์ด'
                  placeholder='เลือกแท็ก'
                  labelPlacement='outside'
                  onChange={handleInputChange}
                >
                  {items.map((item) => (
                    <SelectItem key={item.label} value={item.label}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                <Button className='bg-transparent border-1 border-black' onClick={handleSubmit}>ยืนยัน</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
} 