"use client";
import "./style.css";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardHeader } from "@nextui-org/react";
import { Database } from "@App/types/database.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { keys } from "@mantine/core";
import { json } from "stream/consumers";

function BoardHome() {
  const [userId, setUserId] = useState<any>([]);
  const [recommendations, setRecommendations] = useState<any>([]);
  const [user, setUser] = useState<User | null>(null);
  const [boardData, setBoardData] = useState<any>([]);
  const [srcData, setSrcData] = useState<any>([]);
  const [codata, setCodata] = useState<any>([]);

  const supabase = createClientComponentClient<Database>();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      console.log("user ID is:", data.user?.id);

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/user_id" + data.user?.id
        );
        const datares = await response.json();
        console.log("data response:", datares);
        setRecommendations(datares.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      try {
        // Fetch data from joinBoardtbl
        const { data: joinData } = await supabase
          .from("release_joinboard")
          .select("*")
          .eq("keyUser", data.user?.id);

        if (joinData) {
          // Fetch data from release_boardtbl
          const { data: boardData } = await supabase
            .from("release_boardtbl")
            .select("*");

          // Extract keyImage values from boardData
          const keyImages = boardData?.map((board) => board.keyImage);

          if (keyImages) {
            // Fetch data from release_type_img where keyImage is in keyImages
            const { data: srcData } = await supabase
              .from("release_type_img")
              .select("*")
              .in("keyImage", keyImages);

            console.log("board data : ", boardData);
            console.log("src data : ", srcData);

            const joinData = boardData?.map((item1) => {
              const match = srcData?.find(
                (item2) => item2.keyImage === item1.keyImage
              );
              return { ...item1, ...match };
            });
            if (joinData) {
              setCodata(joinData);
              console.log("join data : ", joinData);
            }
          }
        }
      } catch (error: any) {
        console.error("Error fetching data:", error?.message);
      }
    };

    fetchData();
  }, [boardData, srcData]);

  return (
    <div>
      <div className="wrapper">
        <div className="container">
          {codata?.map((data: any, i: number) => (
            <Card className="figure" key={i} isFooterBlurred>
              <CardHeader className="Header backdrop-blur">
                <div className="Item-hidden backdrop-contrast-50">
                  <h4 className="mix-blend-screen font-medium text-[20px]">
                    {data.nameBoard}
                  </h4>
                  <p className="text-[16px] uppercase font-bold">
                    {data.detail}
                  </p>
                </div>
              </CardHeader>
              <Image
                className="imgcard"
                src={data.src}
                alt="photo"
                width={590}
                height={590}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default BoardHome;
