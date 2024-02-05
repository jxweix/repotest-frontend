import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, userAgent } from "next/server";

import type { Database } from "@App/types/database.types";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { browser } = userAgent(req);

  if (browser.name?.includes("Line")) {
    return NextResponse.redirect(
      new URL("/line-block", "https://repotest-dev.vercel.app")
    );
  }
  console.log("1231");

  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|line-block|_next/static|_next/image|favicon.ico).*)",
  ],
};