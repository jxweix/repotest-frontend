import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image.js";
import { usePathname } from "next/navigation.js";
import Iconnoti from "../../../public/icons/Iconnoti.png";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { SearchIcon } from "./SearchIcon.jsx";

export default function App() {
  const current = usePathname();

  return (
    <Navbar maxWidth={"full"} className="Navbar" isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <AcmeLogo />
          <p className="hidden sm:block font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem isActive={current == "/home"}>
            <Link
              color="foreground"
              href="/home"
              style={{ color: current === "/home" ? "purple" : "" }}
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

      <NavbarContent as="div" className="items-center" justify="end">
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
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
