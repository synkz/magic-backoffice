export const runtime = 'nodejs';

import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");

  if (error) {
    console.error("OAuth error:", error);
    return NextResponse.redirect(new URL("/login?error=oauth_error", requestUrl.origin));
  }

  if (code) {
    const response = NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
    const supabase = createRouteHandlerClient(request, response);
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Error exchanging code for session:", exchangeError);
      return NextResponse.redirect(new URL("/login?error=callback", requestUrl.origin));
    }

    return response;
  }

  return NextResponse.redirect(new URL("/login?error=no_code", requestUrl.origin));
}
