"use client"
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, CheckboxGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, useDisclosure } from "@nextui-org/react";
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@App/types/database.types';

export default function showselect() {
    const [groupSelected, setGroupSelected] = useState<string[]>([]);
    const [dataTypes, setDataType] = useState<any>([]);
    const { isOpen, onOpen } = useDisclosure();
    const path = usePathname();
    const supabase = createClientComponentClient<Database>();
    const [errorMessage] = useState('เลือกอย่างน้อย 1 ประเภท')
    const [getUserid, setGetUserid] = useState<any>([]);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const id = await supabase.auth.getUser()
                if (id) {
                    setGetUserid(id.data.user?.id)
                }
                let { data: typetbl } = await supabase
                    .from('typetbl')
                    .select('*')
                if (typetbl) {
                    setDataType(typetbl)
                }
            } catch (error: any) {
                console.log("data error typetbl : ", error?.message);
            }
            if (path == '/select') {
                onOpen();
            }
        })()
    }, [path, onOpen, getUserid])

    const handleCheckboxChange = (value: any) => {
        if (value.length >= 1) {
            setGroupSelected(value)
        }
    }

    const handleCheckClick = async () => {
        if (groupSelected && groupSelected?.length >= 1) {
            try {
                let { data: upsert, error } = await supabase
                    .from('userConjoin_front')
                    .update({
                        conJoin: groupSelected,
                    })
                    .eq('id', getUserid);
                if (error) {
                    console.log('error upsert', error);
                    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
                }
                else {
                    console.log("data succ this data: ", groupSelected);
                    // alert('บันทึกข้อมูลเรียบร้อยแล้ว')
                    router.push('/board')
                }
            } catch (error) {
                console.log("error catch", error);
            }
        }
    }
    if (dataTypes.length >= 1) {
        const newDataTypes = dataTypes.filter((item: any) => item.nametype.trim() !== 'No data');
        return (
            <>
                <Modal
                    backdrop='blur'
                    // backdrop='transparent'
                    className='max-w-[57vh] h-auto'
                    isOpen={isOpen}
                    hideCloseButton
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader
                                    className='bg-white pb-2'
                                    style={{
                                        backgroundImage: "none",
                                        textAlign: "center",
                                    }}
                                >
                                    <p className='w-full text-[20px]'>เลือกประเภทกิจกรรมที่คุณสนใจ</p>
                                </ModalHeader>
                                <ModalBody>
                                    <CheckboxGroup
                                        label={`Select Tag`}
                                        orientation="horizontal"
                                        value={groupSelected}
                                        onChange={handleCheckboxChange}
                                        isRequired
                                    >
                                        <p className='text-red-800 text-[14px] w-full'>
                                            {`${errorMessage}*`}
                                        </p>
                                        <div className='flex flex-wrap gap-[6px]'>
                                            {newDataTypes.map((item: any, i: number) => (
                                                <Checkbox
                                                    key={i}
                                                    value={item.type_id}
                                                >
                                                    {item.nametype}
                                                </Checkbox>
                                            ))}
                                        </div>
                                    </CheckboxGroup>
                                </ModalBody>
                                <ModalFooter className='flex items-center'>
                                    <div className='flex justify-items-end col-span-1'>
                                        <Button
                                            radius='full'
                                            className='bg-violet-300 border-[1px] border-violet-500'
                                            onClick={handleCheckClick}
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal >
            </>
        )
    }
}
