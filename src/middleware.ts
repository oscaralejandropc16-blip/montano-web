import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger rutas de /admin, excepto la página de login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const adminToken = request.cookies.get('admin_token');

    if (!adminToken || adminToken.value !== 'authenticated') {
      // Redirigir al login si no hay token o es inválido
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Configuración para cabeceras de seguridad adicionales desde el middleware
  const response = NextResponse.next();

  // (Las cabeceras ya se configuran en next.config.ts, pero middleware permite lógica dinámica si se requiriese en el futuro)
  
  return response;
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
