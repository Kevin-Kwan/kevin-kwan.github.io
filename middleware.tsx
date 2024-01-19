import { jwtVerify, importJWK, SignJWT } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const signedInPages = ['/new-post'];

export async function middleware(request: NextRequest) {
  if (signedInPages.find((p) => p === request.nextUrl.pathname)) {
    // console.log('middleware');
    const token = request.cookies.get('token')?.value;
    // console.log(token);
    let username = null;
    if (token) {
      try {
        const key = await importJWK({
          kty: 'oct',
          k: process.env.JWT_SECRET,
          alg: 'HS256',
        });
        const { payload } = await jwtVerify(token, key);
        // console.log(payload);
        username = payload?.username;
      } catch (err) {
        // Token verification failed
        console.error(err);
      }
    }
    // console.log(username);
    if (!username) {
      return NextResponse.rewrite(new URL('/login', request.url));
    } else {
      return NextResponse.next();
    }
  }
}
