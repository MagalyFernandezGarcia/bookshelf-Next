"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const login = async (prevState: string | undefined, data: FormData) => {
  try {
    await signIn("credentials", data);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return "Invalid credentials.";
        default:
          return "Something went wrong. Contact the website administrator.";
      }
    }
    throw error;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/login" });
};
