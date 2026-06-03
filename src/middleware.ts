import { NextResponse } from 'next/config';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // Usuario y contraseña estáticos para MVP
      if (user === 'admin' && pwd === 'montano2026') {
        return NextResponse.next();
      }
    }

    const url = req.nextUrl.clone();
    url.pathname = '/api/auth';

    return new NextResponse('Autenticación requerida', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Acceso Privado a Montano Antilia"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
