import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  
  // Canonical domain (non-www)
  const canonicalDomain = 'wwtravels.net';
  
  // Redirect www to non-www (301 permanent redirect)
  if (hostname === `www.${canonicalDomain}` || hostname.startsWith('www.')) {
    url.hostname = canonicalDomain;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }
  
  // Redirect HTTP to HTTPS (301 permanent redirect)
  // Note: Most hosting providers handle this automatically, but this ensures it works everywhere
  const protocol = request.headers.get('x-forwarded-proto') || 
                   (request.nextUrl.protocol === 'http:' ? 'http' : 'https');
  
  if (protocol === 'http' && hostname === canonicalDomain) {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }
  
  return NextResponse.next();
}

// Only run middleware on the root domain and www subdomain
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

