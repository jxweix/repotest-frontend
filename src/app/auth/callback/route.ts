import type { Database } from '@App/types/database.types'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const protocol = request.headers.get("x-forwarded-proto") || "http";
  console.log("🚀 ~ file: route.ts:11 ~ GET ~ protocol:", protocol)
  console.log("🚀 ~ file: route.ts:10 ~ GET ~ requestUrl:", requestUrl)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
    await supabase.auth.exchangeCodeForSession(code)

    // URL to redirect to after sign in process completes
    // return NextResponse.redirect(`${requestUrl.origin}/board`)
    return NextResponse.redirect(`${protocol}://${requestUrl.host}/board`)
  }
}