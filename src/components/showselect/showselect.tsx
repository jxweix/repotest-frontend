"use client"
import React, { useEffect, useState } from 'react';
import { Button, CheckboxGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, useDisclosure } from "@nextui-org/react";
import { CustomCheckbox } from "./customCheckbox";
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@App/types/database.types';

export default function showselect() {
    const [groupSelected, setGroupSelected] = useState<string[]>([]);
    const [dataTypes, setdataType] = useState<any>([]);
    const { isOpen, onOpen } = useDisclosure();
    const path = usePathname();
    const supabase = createClientComponentClient<Database>();
    const [errorMessage] = useState('สามารถเลือกได้แค่ 5 Tag')
    const [getUserid, setGetUserid] = useState<String>();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const id = await supabase.auth.getUser()
            if (id) {
                const data = id.data.user?.id
                setGetUserid(data)
            }

            try {
                let { data: typetbl } = await supabase
                    .from('typetbl')
                    .select('*')
                if (typetbl) {
                    setdataType(typetbl)
                }


            } catch (error: any) {
                console.log("data error typetbl : ", error?.message);
            }

            if (path == '/select') {
                onOpen();
            }
        })()
    }, [path, onOpen])

    const handleCheckboxChange = (value: any) => {
        if (value.length <= 5) {
            setGroupSelected(value)
        }
    }

    // const handleCheckClick = async () => {
    //     if (groupSelected && groupSelected?.length == 5) {
    //         try {
    //             let { data: upsert, error } = await supabase
    //                 .from('userConjoin_front')
    //                 .upsert([
    //                     {
    //                         id: getUserid,
    //                         conJoin: groupSelected,
    //                     }
    //                 ])
    //             if (error) {
    //                 console.log('error upsert', error);
    //                 alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    //             }
    //             else {
    //                 console.log("data succ this data: ", groupSelected);
    //             }
    //         } catch (error) {
    //             console.log("error catch", error);
    //         }
    //     }
    // }

    const handleCheckClick = async () => {
        if (groupSelected && groupSelected?.length == 5) {
            try {
                let { data: upsert, error } = await supabase
                    .from('userConjoin_front')
                    .upsert([
                        {
                            id: getUserid,
                            conJoin: groupSelected,
                        }
                    ])
                if (error) {
                    console.log('error upsert', error);
                    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
                }
                else {
                    console.log("data succ this data: ", groupSelected);
                    router.push('/board')
                }
            } catch (error) {
                console.log("error catch", error);
            }
        }
    }

    return (
        <>
            <Modal
                // backdrop='blur'
                backdrop='transparent'
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
                                    <ScrollShadow hideScrollBar offset={0}>
                                        <div className='flex flex-wrap gap-[6px]'>
                                            {dataTypes.map((item: any, i: number) => (
                                                <CustomCheckbox
                                                    key={i}
                                                    value={item.type_id}
                                                >
                                                    {item.name}
                                                </CustomCheckbox>
                                            ))}
                                        </div>
                                    </ScrollShadow>
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
