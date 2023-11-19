import { NextResponse, type NextRequest } from 'next/server';

import { createClient } from './utils/supabase/middleware';

const protectedRoutes = ['/timer'];

export default async function middleware(request: NextRequest) {
  const { supabase } = createClient(request);
  const { data } = await supabase.auth.getUser();

  if (!data.user && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteUrl = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
}
