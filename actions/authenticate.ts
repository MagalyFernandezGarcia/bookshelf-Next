"use server";

import {  UserSchema } from "@/app/types/User";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";


export const login = async (
  prevState: string | undefined,
  formData: FormData
) => {
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const { success, data: validateUser, error } = UserSchema.safeParse(user);
  if (success) {
    try {
      await signIn("credentials", validateUser);
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
  } else {
    console.error(error);

    return "Veuillez remplir les champs";
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/login" });
};


