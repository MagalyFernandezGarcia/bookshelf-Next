import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  
  if (url.searchParams.has('filter')) {
    
    url.searchParams.delete('filter');
    return NextResponse.redirect(url); 
  }

  return NextResponse.redirect(url);
}


export const config = {
  matcher: '/bookshelf/:path*',
};