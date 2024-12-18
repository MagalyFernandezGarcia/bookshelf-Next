"use client"

import Link from "next/link";
import {login} from "@/actions/authenticate";
import { useFormState } from "react-dom";
import LoginButton from "@/components/Buttons/LoginButton";


export default function Login() {
  const [errorMessage, dispatch] = useFormState(login, undefined);
 

  return (
    <div className="flex flex-col justify-center items-center mt-36 ">
         <h2 className="text-2xl font-bold">Login</h2>
       <form action={dispatch} className="flex flex-col justify-center items-center mt-8">
         <div className="flex flex-col mt-6">
          <label htmlFor="email" className="text-xs ps-16  ">
            Email
           </label>{" "}
          <input
            type="mail"
            placeholder="pims@cat.be"
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full lg:w-[600px]"
            name="email"
            
          />
          
        </div>
        <div className="flex flex-col mt-6 ">
          <label htmlFor="password" className="text-xs ps-16 lg:w-[600px] ">
            Mot de passe
          </label>{" "}
          <input
            type="password"
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full"
            name="password"
            
            />
            
        </div>

        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
        <LoginButton/>
        
        <Link href="/account" className="mt-4">Créer un compte</Link>
      </form>
      </div>

    
  );
}
