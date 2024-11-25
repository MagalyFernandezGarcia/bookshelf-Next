"use client"

import Link from "next/link";
import {login} from "@/actions/authenticate";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { User, UserSchema } from "../types/User";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  // const [errorMessage, dispatch] = useFormState(login, undefined);
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: zodResolver(UserSchema),
  });

  return (
    <div className="flex flex-col justify-center items-center mt-36 ">
        <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit(login)} className="flex flex-col justify-center items-center mt-8">
        <div className="flex flex-col mt-6">
          <label htmlFor="mail" className="text-xs ps-16  ">
            Email
          </label>{" "}
          <input
            type="mail"
            placeholder="pims@cat.be"
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full lg:w-[600px]"
            {...register("email")}
          />
          {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>)}
        </div>
        <div className="flex flex-col mt-6 ">
          <label htmlFor="password" className="text-xs ps-16 lg:w-[600px] ">
            Mot de passe
          </label>{" "}
          <input
            type="password"
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full"
            {...register("password")}
            />
            {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>} */}
        <button type="submit" className="mt-12 bg-[#794822] p-4 rounded-lg text-[#F8D8B1]">S'identifier</button>
        <Link href="/account" className="mt-4">Créer un compte</Link>
      </form>
    </div>
  );
}
