import { Database } from "#Proj/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    
    console.log(session);

    // redirect("/unauthenticated");
  }

  // console.log(session);
  const { data: todos } = await supabase.from("income").select("*");
  console.log("13",todos);

  return (
    <>
      <h1>Hello, {session?.user.email}</h1>
    </>
  );
}
