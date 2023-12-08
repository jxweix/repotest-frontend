"use client";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image.js";
import { usePathname, useRouter } from "next/navigation.js";
import { Database } from "@App/types/database.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Iconnoti from "../../../public/icons/Iconnoti.png";
import Discord from '../../../public/icons/discord.png'
import google from '../../../public/icons/google.png'
import github from '../../../public/icons/github.png'
import { AcmeLogo } from "./AcmeLogo";
import { SearchIcon } from "./SearchIcon";

export default function App() {
  const current = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<User | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    })();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null)
    router.push('/home');
    setTimeout(() => {
      router.refresh();
      window.location.reload();
    }, 500)
  };

  if (user !== null && user !== undefined) {
    // กรณีที่ user มีข้อมูล
    return (
      <Navbar maxWidth={"full"} className="Navbar" isBordered>
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <AcmeLogo />
            <p className="hidden sm:block font-bold text-inherit">ACME</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-3">
            <NavbarItem isActive={current == "/board"}>
              <Link
                color="foreground"
                href="/board"
                style={{ color: current === "/board" ? "purple" : "" }}
              >
                หน้าแรก
              </Link>
            </NavbarItem>
            <NavbarItem isActive={current == "/addboard"}>
              <Link
                color="foreground"
                href="/addboard"
                style={{ color: current === "/addboard" ? "purple" : "" }}
              >
                สร้างบอร์ด
              </Link>
            </NavbarItem>
            <NavbarItem isActive={current == "/search"}>
              <Link
                color="foreground"
                href="/search"
                style={{ color: current === "/search" ? "purple" : "" }}
              >
                หน้าค้นหา
              </Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>
        <NavbarContent className="w-full" justify="center">
          <Input
            classNames={{
              base: "max-w-full h-10",
              mainWrapper: "h-full",
              input: ["text-small", "bg-transparent", "text-white"],
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 border-white dark:bg-transparent-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            radius="full"
            variant="bordered"
            startContent={<SearchIcon size={18} width={18} height={18} />}
            type="search"
          />
        </NavbarContent>
        <NavbarContent as="div" className="items-center" justify="end">
          <Link href="/notificate">
            <Button variant="light" isIconOnly>
              <Image src={Iconnoti} width={28} alt="icon-noti" />
            </Button>
          </Link>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={`${user?.user_metadata.picture}`}
              />
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              disabledKeys={['text']}
            >
              <DropdownItem key="text">
                <p className="text-[14px]">เข้าสู่ระบบอยู่</p>
              </DropdownItem>
              <DropdownItem key="profile" className="h-20 gap-2">
                <div className="grid-cols-4 grid items-center">
                  <div className="grid col-span-1 justify-center">
                    <Avatar
                      className="transition-transform "
                      name="pic"
                      size="lg"
                      src={`${user?.user_metadata.picture}`}
                    />
                  </div>
                  <div className="grid col-span-3 items-centerD">
                    <p className="text-[14px] font-semibold">{user?.user_metadata.full_name ?? ""}</p>
                    <p className="text-[14px] font-normal text-[#868e96]">อีเมล์</p>
                    <p className="text-[14px] font-semibold">{user?.email ?? ""}</p>
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                variant="flat"
                className="text-danger"
                onClick={() => {
                  handleSignOut();
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    );
  } else {
    // กรณีที่ user เป็น null หรือ undefined
    return (
      <Navbar maxWidth={"full"} className="Navbar" isBordered>
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button onPress={onOpen} color="secondary" variant="flat" >Sign In</Button>
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
                        <Image src={Discord} width={24} alt={"discord"} />Sign in with Discord</Button>
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
          </NavbarItem>
        </NavbarContent>
      </Navbar >
    );
  }

}