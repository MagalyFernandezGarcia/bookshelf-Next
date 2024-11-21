import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnLoginPage = nextUrl.pathname.startsWith("/login");
			if (isOnLoginPage) {
				if (isLoggedIn) return true; //je ne comprends pas tout le code ci-dessous
				return false;
			} else if (isLoggedIn) {
				return Response.redirect(new URL("/", nextUrl));
			}
			return true;
		},
	},
	providers: [],
} satisfies NextAuthConfig;
