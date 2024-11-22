import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};


import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();

  const publicPaths = ["/account", "/login"]; 
  const isPublicPath = publicPaths.some((path) => req.nextUrl.pathname.startsWith(path));

  if (isPublicPath) {
    
    return NextResponse.next();
  }

  if (!session) {
    
    return NextResponse.redirect(new URL("/login", req.url));
  }

  
  if (session && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}