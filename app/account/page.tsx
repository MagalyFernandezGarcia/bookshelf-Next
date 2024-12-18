"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { NewUser, NewUserSchema } from "../types/User";
import { createUser } from "../db.service";
import { useState } from "react";
import AccountModal from "@/components/Modals/AccountModal";
import bcrypt from 'bcryptjs'
import { zodResolver } from "@hookform/resolvers/zod";

const Account = () => {
  const[showModal, setShowModal] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<NewUser>({
    resolver: zodResolver(NewUserSchema),
  });

  const onSubmit: SubmitHandler<NewUser> = async (data) => {

    try {
      await createUser({ ...data, password: await bcrypt.hash(data.password, 10) });
      
      
      setShowModal(true);
      
    } catch (error) {
      console.log(error);
    }
  };
  if(showModal){
    return <AccountModal />
  }
  return (
    <div className="flex flex-col justify-center items-center mt-36">
      <h2 className="text-2xl font-bold">Login</h2>
      <form
        action=""
        className="flex flex-col justify-center items-center mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col mt-6">
          <label htmlFor="name" className="text-xs ps-16  ">
            Nom
          </label>{" "}
          <input
            type="text"
            placeholder="Jaimie Lyre"
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full lg:w-[600px]"
            {...register("name")}
          />
          {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
        </div>
        <div className="flex flex-col mt-6">
          <label htmlFor="email" className="text-xs ps-16  ">
            Email
          </label>{" "}
          <input
            type="mail"
            placeholder="pims@cat.be"
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full lg:w-[600px]"
            {...register("email")}
          />
          {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
        </div>
        <div className="flex flex-col mt-6">
          <label htmlFor="password" className="text-xs ps-16  ">
            Mot de passe
          </label>{" "}
          <input
            type="password"
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full lg:w-[600px]"
            {...register("password")}
          />
          {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
        </div>

        <button
          type="submit"
          className="mt-12 bg-[#794822] p-4 rounded-lg text-[#F8D8B1]"
        >
          Créer
        </button>
      </form>
    </div>
  );
};
export default Account;
