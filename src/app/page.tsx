"use client"
import { Button, Modal, ModalContent, ModalBody, ModalHeader, useDisclosure } from "@nextui-org/react";
import Image from 'next/image';
import router from "next/router";
import discord from '../../public/icons/discord.png'
import google from '../../public/icons/google.png'
import github from '../../public/icons/github.png'

function page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="BG-page123">
      <div className="wrapper">
        <div className="grid grid-rows-2 justify-items-center">
          <p className=" grid row-span-1 text-[64px] text-center text-white font-semibold">มาใช้ประโยชน์จากเวลาว่างกันเถอะ</p>
          <Button
            className="w-[160px] h-[50px] text-white"
            onPress={onOpen}
            style={{
              background: 'linear-gradient(to right, #9500FF, #6F00B3)',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            radius="full"
            variant='light'
            color="secondary"
          >
            <p className='text-[24px]'>เข้าสู่ระบบ</p>
          </Button>
          <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              <>
                <ModalHeader className="grid justify-center bg-white">เลือกวิธีล็อกอิน</ModalHeader>
                <ModalBody>
                  <div className="w-full grid gap-2 my-[2px]">
                    <Button className="w-full py-1 my-[2px] border-1 rounded-3xl"
                      onClick={() => { router.push("/auth/signIn?type=google"); }}
                      color="default" variant="light"
                    >
                      <Image src={google} width={24} alt={"google"} />Sign in with Google</Button>
                    <Button className="w-full py-1 my-[2px] border-1 rounded-3xl"
                      onClick={() => { router.push("/auth/signIn?type=discord"); }}
                      color="default" variant="light"
                    >
                      <Image src={discord} width={24} alt={"discord"} />Sign in with Discord</Button>
                    <Button className="w-full py-1 my-[2px] border-1 rounded-3xl"
                      onClick={() => { router.push("/auth/signIn?type=github"); }}
                      color="default" variant="light"
                    >
                      <Image src={github} width={24} alt={"github"} />Sign in with Github</Button>
                  </div>
                </ModalBody>
              </>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default page;