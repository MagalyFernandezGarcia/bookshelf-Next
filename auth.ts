import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import prisma from "./app/dbConfig/prisma";
import bcrypt from 'bcryptjs'


async function getUser(mail: string) {
    try {
      return prisma.user.findUnique({ where: { email: mail } });
    } catch (error) {
      throw new Error("Failed to fetch user.");
    }
  }

export const { signIn, signOut, auth } = NextAuth({
	...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ mail: z.string().email(), password: z.string() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { mail, password } = parsedCredentials.data;
          const user = await getUser(mail);

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return {
              name: user.name,
              email: user.email,
              id: user.id.toString()
            };
          }
        }

        return null;
      },
    }),
  ],
});
