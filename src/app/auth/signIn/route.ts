import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "#Proj/lib/database.types";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const protocol = request.headers.get("x-forwarded-proto") || "http";
  const params = new URLSearchParams(request.url);
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  });

  const loginType = params.values().next().value;
  const { data } = await supabase.auth.signInWithOAuth({
    provider: loginType,
    options: {
      redirectTo: `${protocol}://${request.headers.get("host")}/auth/callback`,
    },
  });

  return NextResponse.redirect(data.url ?? "");
}
