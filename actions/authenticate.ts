"use server";

import { User, UserSchema } from "@/app/types/User";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { SubmitHandler } from "react-hook-form";

// export const login = async (prevState: string | undefined, data: FormData) => {
//   try {
//     await signIn("credentials", data);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//         case "CallbackRouteError":
//           return "Invalid credentials.";
//         default:
//           return "Something went wrong. Contact the website administrator.";
//       }
//     }
//     throw error;
//   }
// };

export const logout = async () => {
  await signOut({ redirectTo: "/login" });
};



export const login :SubmitHandler<User> = async(data)=>{
  const { success, data: validateUser } = UserSchema.safeParse(data);

		if (success) {
			try {
				await signIn("credentials", validateUser);

				;
			} catch (error) {
				console.log(error);
        
			}
		
	};
}