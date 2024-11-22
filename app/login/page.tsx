"use client";


import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserRegistration } from "../types/User";

export default function Login() {
  const { register, handleSubmit } = useForm<UserRegistration>({});
 

  const onSubmit: SubmitHandler<UserRegistration> = async (data) => {
    console.log(data);
		
	};
  return (
    <div className="flex flex-col justify-center items-center mt-36">
        <h2 className="text-2xl font-bold">Login</h2>
      <form action=""  className="flex flex-col justify-center items-center mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-6">
          <label htmlFor="mail" className="text-xs ps-16  ">
            Email
          </label>{" "}
          <input
            type="mail"
            placeholder="pims@cat.be"
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full"
            {...register("mail")}
          />
        </div>
        <div className="flex flex-col mt-6 ">
          <label htmlFor="password" className="text-xs ps-16 ">
            Mot de passe
          </label>{" "}
          <input
            type="text"
            
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full"
            {...register("password")}
          />
        </div>
        

        <button type="submit" className="mt-12 bg-[#794822] p-4 rounded-lg text-[#F8D8B1]">S'identifier</button>
        <Link href="/account" className="mt-4">Créer un compte</Link>
      </form>
    </div>
  );
}
