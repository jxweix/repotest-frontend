"use client";
import { useEffect, useState } from 'react';

function UnauthenticatedPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const response = await fetch('/api/check-auth');
      const data = await response.json();
      setLoggedIn(data.loggedIn);
    }

    checkAuth();
  }, []);

  if (loggedIn) {
    return <p>You are already logged in.</p>;
  } else {
    return <p>Please sign in to see todos!</p>;
  }
}

export default UnauthenticatedPage;


// import type { Database } from '@App/types/database.types';
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export default async function Unauthenticated() {
//   const supabase = createServerComponentClient<Database>({ cookies });
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (session) {
//     redirect("/");
//   }

//   return <p>Please sign in to see todos!</p>;
// }