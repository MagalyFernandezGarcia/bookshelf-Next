import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "/login",
		
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnLoginPage = nextUrl.pathname.startsWith("/login");
			if (isLoggedIn) {
				if (isOnLoginPage) {
				  return Response.redirect(new URL("/", nextUrl));
				}
				return true;
			  }
      
		},
		
		
	},
	providers: [],
} satisfies NextAuthConfig;
