import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  const { pathname } = req.nextUrl;
  
  if (pathname.startsWith('/portal') && !pathname.startsWith('/portal/login')) {
    if (token !== 'authenticated') {
      const url = req.nextUrl.clone();
      url.pathname = '/portal/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal', '/portal/:path*'],
};
