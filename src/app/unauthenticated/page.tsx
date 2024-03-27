import type { Database } from '@App/types/database.types';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function Unauthenticated() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return NextResponse.redirect("/");
  }

  return <p>Please sign in to see todos!</p>;
}