'use client'
import React, { useEffect, useState } from 'react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import Image from 'next/image';

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
    <div>
      <div className='wrapper bg-slate-500'>
        <div className='border-1 border-black p-4 rounded-[27px] bg-white'>
          <div className='grid grid-cols-2'>
            <div className='grid'>
              <Input type="file" name="myImage" onChange={uploadToClient}></Input>
              {createObjectURL.map((img: any, i: number) => (
                <Image key={i} src={img} alt={`Object URL ${i}`} width={150} height={200} />
              ))}
            </div>
            <div className='grid gap-5'>
              <Input
                name='nameboard'
                type='text' size='sm'
                labelPlacement='outside'
                label='ชื่อบอร์ด'
                placeholder='ใส่ชื่อบอร์ด'
                onChange={handleInputChange} />
              <Input
                name='detail'
                className='h-[150px] w-[150px]'
                type='text' size='lg' labelPlacement='outside'
                label='คำอธิบาย'
                placeholder='ใส่คำอธิบายเพิ่มเติมเกี่ยวกับบอร์ดนนี้'
                onChange={handleInputChange} />
              <Select
                name='tag'
                size='sm'
                label='Select Label'
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
              <Button onClick={handleSubmit}>ยืนยัน</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}