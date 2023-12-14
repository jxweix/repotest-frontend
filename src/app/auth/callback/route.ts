import type { Database } from '@App/types/database.types'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
    const response = await supabase.auth.exchangeCodeForSession(code)

    if (response.error) {
      return NextResponse.redirect(`${requestUrl.origin}/allboard`)
    }
  // URL to redirect to after sign in process completes
    return NextResponse.redirect(`${requestUrl.origin}/board`)
  }
  return NextResponse.redirect(`${requestUrl.origin}/`)
}