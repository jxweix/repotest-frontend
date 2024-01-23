"use client"
import { Button, Modal, ModalContent, ModalBody, ModalHeader, useDisclosure } from "@nextui-org/react";
import Image from 'next/image';
import discord from '../../public/icons/discord.png'
import google from '../../public/icons/google.png'
import github from '../../public/icons/github.png'
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@App/types/database.types";
import { useEffect } from "react";

function page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user !== null) {
        let { data: userConjoin_conJoin } = await supabase
          .from('userConjoin_front')
          .select('conJoin')
          .eq('id', data.user.id);
        if (data) {
          const newData = {
            id: data.user.id,
          }
          const check = await userConjoin_conJoin
          const { data: upsertData, error } = await supabase
            .from('userConjoin_front')
            .upsert([
              {
                ...newData,
              },
            ]);

          // ทดสอบ upsertData 
          if (error) {
            console.error('Error upserting data:', error);
          }
          else {
            console.log('Data upserted successfully:', upsertData);
          }

          if (check && check.length > 0 && check[0].conJoin !== null) {
            router.push('/board')
          } else {
            router.push('select')
          }
        }
      }
    })()
  }, [])

  return (
    <div className="BG-page123">
      <div className="wrapper">
        <div className="grid grid-rows-2 justify-items-center">
          <p className=" grid row-span-1 text-[64px] text-center text-white font-semibold">
            Activity Recommendation System
          </p>
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
  // return (
  //   <div className="BG-page123">
  //     <div className="grid grid-cols-2 h-[97vh]">
  //       <div className="grid items-center w-full justify-items-center">
  //         <Image
  //           className="max-h-[100vh] bg-cover"
  //           width={600}
  //           height={600}
  //           alt="img"
  //           src={'https://www.ninjateck.com/assets/img/login.png'}
  //         />
  //       </div>

  //       <div className="grid justify-items-center bg-white">
  //         <p className="items-end grid items-center text-[45px] text-center text-purple-900 font-semibold">
  //           Activity <br /> Recommendation System
  //         </p>
  //         {/* <Button
  //           className="w-[160px] h-[50px] text-white"
  //           onPress={onOpen}
  //           style={{
  //             background: 'linear-gradient(to right, #9500FF, #6F00B3)',
  //             boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  //           }}
  //           radius="full"
  //           variant='light'
  //           color="secondary"
  //         >
  //           <p className='text-[24px]'>เข้าสู่ระบบ</p>
  //         </Button> */}
  //         <div className="w-[600px] h-[150px] grid gap-1 my-[2px]">
  //           <Button className="w-full bg-purple-400 border-[#800bd3] py-1 my-[2px] border-1 rounded-3xl"
  //             onClick={() => { router.push("/auth/signIn?type=google"); }}
  //             color="default" variant="light"
  //           >
  //             <Image src={google} width={24} alt={"google"} />Sign in with Google</Button>
  //           <Button className="w-full bg-purple-400 border-[#800bd3] py-1 my-[2px] border-1 rounded-3xl"
  //             onClick={() => { router.push("/auth/signIn?type=discord"); }}
  //             color="default" variant="light"
  //           >
  //             <Image src={discord} width={24} alt={"discord"} />Sign in with Discord</Button>
  //           <Button className="w-full bg-purple-400 border-[#800bd3] py-1 my-[2px] border-1 rounded-3xl"
  //             onClick={() => { router.push("/auth/signIn?type=github"); }}
  //             color="default" variant="light"
  //           >
  //             <Image src={github} width={24} alt={"github"} />Sign in with Github</Button>
  //         </div>
  //         <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
  //           <ModalContent>
  //             <>
  //               <ModalHeader className="grid justify-center bg-white">เลือกวิธีล็อกอิน</ModalHeader>
  //               <ModalBody>
  //                 <div className="w-full grid gap-2 my-[2px]">
  //                   <Button className="w-full py-1 my-[2px] border-1 rounded-3xl"
  //                     onClick={() => { router.push("/auth/signIn?type=google"); }}
  //                     color="default" variant="light"
  //                   >
  //                     <Image src={google} width={24} alt={"google"} />Sign in with Google</Button>
  //                   <Button className="w-full py-1 my-[2px] border-1 rounded-3xl"
  //                     onClick={() => { router.push("/auth/signIn?type=discord"); }}
  //                     color="default" variant="light"
  //                   >
  //                     <Image src={discord} width={24} alt={"discord"} />Sign in with Discord</Button>
  //                   <Button className="w-full py-1 my-[2px] border-1 rounded-3xl"
  //                     onClick={() => { router.push("/auth/signIn?type=github"); }}
  //                     color="default" variant="light"
  //                   >
  //                     <Image src={github} width={24} alt={"github"} />Sign in with Github</Button>
  //                 </div>
  //               </ModalBody>
  //             </>
  //           </ModalContent>
  //         </Modal>
  //       </div>

  //     </div>
  //   </div>
  // )

}
export default page;