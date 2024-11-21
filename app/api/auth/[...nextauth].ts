import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	session: {
		strategy: "database",
	},
	callbacks: {
		async session({ session, user }) {
			// Add user ID to session for easier access on the client side
			if (user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
});
