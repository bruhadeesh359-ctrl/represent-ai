import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // The middleware will handle redirecting to onboarding if necessary
      return NextResponse.redirect(`${origin}${next}`)
    } else {
      console.error("SUPABASE AUTH ERROR:", error.message, error)
    }
  } else {
    console.error("NO CODE IN URL")
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth-failed`)
}
