const mockData = [
  {
    img: "/photo/pic-1.jpg",
    title: "กีฬาทางน้ำ",
    text: "ว่ายน้ำ ปาร์ตี้ริมสระ",
  },
  {
    img: "/photo/pic-1.jpg",
    title: "เอ็กตรีม",
    text: "กระโดดร่ม ปืนหน้าผา",
  },
  {
    img: "/photo/pic-1.jpg",
    title: "กีฬากลางแจ้ง",
    text: "เล่นบอล ตีเทนนิส",
  },
  {
    img: "/photo/pic-1.jpg",
    title: "บอร์ดเกม",
    text: "เล่นไผ่ หมาป่า เกมเศรษฐี",
  },
  {
    img: "/photo/pic-1.jpg",
    title: "เกมออนไลน์",
    text: "เกมยิงปืน เกมต่อสู้",
  },
];

import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
  const coockies =cookies().getAll()
  return NextResponse.json({ coockie:coockies });
}
