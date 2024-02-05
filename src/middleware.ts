import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, userAgent } from "next/server";

import type { Database } from "@App/types/database.types";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { browser } = userAgent(req);

  if (browser.name?.includes("Line")) {
    return NextResponse.redirect(
      new URL("/", "https://repotest-dev.vercel.app")
    );
  }

  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();
  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/:path*"],
};
