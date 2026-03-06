import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Define protected and public routes
    const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/users');
    const isLoginPage = pathname === '/login';

    const hasSession = request.cookies.has('laravel_session') || request.cookies.has('XSRF-TOKEN');

    if (isProtectedRoute && !hasSession) {
        const url = new URL('/login', request.url);
        return NextResponse.redirect(url);
    }

    if (isLoginPage && hasSession) {
        if (request.nextUrl.searchParams.has('clear_session') || request.nextUrl.searchParams.has('error')) {
            const response = NextResponse.next();
            response.cookies.delete('laravel_session');
            response.cookies.delete('XSRF-TOKEN');
            return response;
        }

        const url = new URL('/dashboard', request.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
