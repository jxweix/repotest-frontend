"use client";

import { Database } from "@App/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
   supabase.from("income").select("*").then(i=>{
     console.log(i);

   });

  const handleSignIn = async () => {
    // await supabase.auth.signInWithPassword({
    //   email: "jpjpjp.phone6@gmail.com",
    //   password: "963852741asd",
    // });

    // router.refresh();
    router.push("/auth/signIn?type=google");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  supabase.auth.getSession().then((data) => {
    console.log(data);
  });
  return (
    <div className="flex gap-2">
      {}
      {/* <button onClick={handleSignUp}>Sign up</button> */}
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
