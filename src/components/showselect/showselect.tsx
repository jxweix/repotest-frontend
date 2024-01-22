"use client"
import React, { useEffect, useState } from 'react';
import { Button, CheckboxGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, useDisclosure } from "@nextui-org/react";
import { CustomCheckbox } from "./customCheckbox";
import { usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@App/types/database.types';
import { Notification } from '@mantine/core';
import getUserConJoinByID from '@App/actions/getUserConjoinByID';

export default function showselect() {
    const [groupSelected, setGroupSelected] = useState<string[]>([]);
    const [dataTypes, setdataType] = useState<any>([]);
    const { isOpen, onOpen } = useDisclosure();
    const path = usePathname();
    const supabase = createClientComponentClient<Database>();
    const [errorMessage] = useState('สามารถเลือกได้แค่ 5 Tag')
    const [getUserid, setGetUserid] = useState<String>();

    useEffect(() => {
        (async () => {
            const id = await supabase.auth.getUser()
            if (id) {
                const data = id.data.user?.id
                setGetUserid(data)
            }
            if (id.data.user?.id) {
                const conJoinData = await getUserConJoinByID(id.data.user?.id)
                console.log("conJoinData", conJoinData);

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
                }
            } catch (error) {
                console.log("error catch", error);
            }
        }
    }

    return (
        <>
            <Notification className='z-60' title="We notify you that">
                You are now obligated to give a star to Mantine project on GitHub
            </Notification>
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
                            <ModalFooter className='grid-cols-5 grid items-center'>
                                <p className="grid col-span-4 ml-1 text-default-500">
                                    Selected: {groupSelected.join(", ")}
                                </p>
                                <div className='grid col-span-1'>
                                    <Button
                                        radius='full'
                                        className='bg-violet-300 border-[1px] border-violet-500'
                                        onClick={handleCheckClick}
                                    >
                                        button stupid
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
