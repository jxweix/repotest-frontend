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
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image.js";
import { usePathname, useRouter } from "next/navigation";
import { Database } from "@App/types/database.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
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
  const [inputSeag, setInputSeag] = useState<string>('');
  const [dataItem, setDataItem] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      let { data: datafetch } = await supabase
        .from('typetbl')
        .select('type_id , nametype , detail , activity_show(id,name)')
      if (datafetch) {
        setDataItem(datafetch)
      }
    })();
  }, []);

  const LowCase: string = inputSeag ? inputSeag.toLowerCase() : '';
  const matchSeach = dataItem.map((item: any) => ({
    nametype: item.nametype.toLowerCase(),
    nameBoard: item.activity_show.map((items: any) => ({
      id: items.id,
      name: items.name.toLowerCase()
    }))
  }));

  const filterWord = matchSeach.filter((item: any) => {
    // ใช้ some เพื่อตรวจสอบว่ามีชื่อใดชื่อหนึ่งใน nameBoard ที่มีค่าตรงกับ LowCase หรือไม่
    return item.nametype.includes(LowCase) || item.nameBoard.some((board: any) => board.name.includes(LowCase));
  }).map((item: any) => ({
    nametype: item.nametype,
    nameBoard: item.nameBoard.filter((board: any) => ({
      id: board.id,
      name: board.name.includes(LowCase)
    }))
  }));
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null)
    router.push('/');
    setTimeout(() => {
      router.refresh();
      window.location.reload();
    }, 500)
  };

  const handleClick = (e: any) => {
    router.push(`/board/${e}/detail`)
  }

  if (user !== null && user !== undefined) {
    // กรณีที่ user มีข้อมูล
    return (
      <Navbar maxWidth={"full"} className="Navbar" isBordered>
        <NavbarMenu className="text-center gap-[5vh] pt-[5vh]">
          <NavbarItem isActive={current == "/board"}>
            <Link
              color="foreground"
              href="/board"
              style={{ color: current === "/board" ? "purple" : "" }}
            >
              หน้าแรก
            </Link>
          </NavbarItem>
          <NavbarItem isActive={current == "/allactivity"}>
            <Link
              color="foreground"
              href="/allactivity"
              style={{ color: current === "/allactivity" ? "purple" : "" }}
            >
              ประเภทของกิจกรรม
            </Link>
          </NavbarItem>
          <NavbarItem isActive={current == "/about"}>
            <Link
              color="foreground"
              href="/about"
              style={{ color: current === "/about" ? "purple" : "" }}
            >
              เกี่ยวกับเรา
            </Link>
          </NavbarItem>
          <NavbarItem >
            <Link
              color="warning"
              onClick={() => {
                router.push('/select')
              }}
            >
              Change Favorite
            </Link>
          </NavbarItem>
          <NavbarItem >
            <Link
              color="danger"
              onClick={() => {
                handleSignOut();
              }}
            >
              Log Out
            </Link>
          </NavbarItem>
        </NavbarMenu>

        <NavbarContent>
          <NavbarMenuToggle
            className="sm:hidden"
          />
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">ARS</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="md:hidden lg:flex" justify="start">
          <NavbarContent className="sm:flex gap-3">
            <NavbarItem isActive={current == "/board"}>
              <Link
                color="foreground"
                href="/board"
                style={{ color: current === "/board" ? "purple" : "" }}
              >
                หน้าแรก
              </Link>
            </NavbarItem>
            <NavbarItem isActive={current == "/allactivity"}>
              <Link
                color="foreground"
                href="/allactivity"
                style={{ color: current === "/allactivity" ? "purple" : "" }}
              >
                ประเภทของกิจกรรม
              </Link>
            </NavbarItem>
            <NavbarItem isActive={current == "/about"}>
              <Link
                color="foreground"
                href="/about"
                style={{ color: current === "/about" ? "purple" : "" }}
              >
                เกี่ยวกับเรา
              </Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>
        <NavbarContent className="w-full" justify="center">
          <Input
            classNames={{
              base: "max-w-full h-10 ",
              mainWrapper: "h-full",
              input: ["text-small", "bg-transparent", "text-drak"],
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 border-white dark:bg-transparent-500/20",
            }}
            onClick={onOpen}
            placeholder="Type to search..."
            size="sm"
            radius="full"
            variant="bordered"
            startContent={<SearchIcon size={18} width={18} height={18} />}
            type="search"
          />
          <Modal
            classNames={{
              base: "md:top-[7vh] lg:top-[1vh]"
            }}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            hideCloseButton
            placement="top"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>
                    <Input
                      classNames={{
                        base: "max-w-full h-10 ",
                        mainWrapper: "h-full",
                        input: ["text-small", "bg-transparent", "text-drak"],
                        inputWrapper:
                          "h-full font-normal text-default-500 bg-default-400/20 border-white dark:bg-transparent-500/20",
                      }}
                      onValueChange={setInputSeag}
                      placeholder="Type to search..."
                      size="sm"
                      radius="full"
                      variant="bordered"
                      startContent={<SearchIcon size={18} width={18} height={18} />}
                      type="search"
                    />
                  </ModalHeader>
                  <ModalBody className="gap-1 flex w-auto">
                    <p>ค้นหา</p>
                    {filterWord.map((item: any, i: number) => (
                      <div key={i} className="flex md:flex-wrap gap-1">
                        {item.nameBoard.map((board: any, j: number) => (
                          <Button
                            key={j}
                            className="w-full flex"
                            variant='light'
                            color="secondary"
                            onClick={() => handleClick(board.id)}
                          >
                            <SearchIcon style={{ color: '#969696' }} className="min-w-[18px] px-[0.4px]" size={18} width={18} height={18} />
                            <p className="flex w-full grow text-center ">{board.name}</p>
                          </Button>
                        ))}
                      </div>
                    ))}
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </NavbarContent>
        <NavbarContent as="div" className="items-center" justify="end">
          {/* <Link href="/notificate">
            <Button variant="light" isIconOnly>
              <Image src={Iconnoti} width={28} alt="icon-noti" />
            </Button>
          </Link> */}
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
              <DropdownItem key="profile" className="h-20 shadow-lg  gap-2">
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
                key="changeSelect"
                variant="flat"
                onClick={() => {
                  router.push('/select')
                }}
              >
                Change Favorite
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
      </Navbar >
    );
  } else {
    // กรณีที่ user เป็นยังไม่ได้ทำการ login
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