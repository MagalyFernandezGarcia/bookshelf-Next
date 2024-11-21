import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import prisma from "./app/dbConfig/prisma";
// import bcrypt from 'bcrypt'


async function getUser(usermail: string) {
    try {
      return prisma.user.findUnique({ where: { email: usermail } });
    } catch (error) {
      throw new Error("Failed to fetch user.");
    }
  }

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {//????
        const parsedCredentials = z
          .object({ usermail: z.string(), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { usermail, password } = parsedCredentials.data;
          const user = await getUser(usermail);

          if (!user) {
            return null;
          }

          // const passwordsMatch = await bcrypt.compare(password, user.password);
          // if (passwordsMatch) {
          //   return user;
          // }
        }

        return null;
      },
    }),
  ],
});
