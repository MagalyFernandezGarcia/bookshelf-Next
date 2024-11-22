"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { NewUser } from "../types/User";
import { createUser } from "../db.service";
import { useState } from "react";
import AccountModal from "@/components/Modals/AccountModal";
import bcrypt from 'bcryptjs'

const Account = () => {
  const[showModal, setShowModal] = useState(false);
  
  const { register, handleSubmit } = useForm<NewUser>({});

  const onSubmit: SubmitHandler<NewUser> = async (data) => {
    data.password = await bcrypt.hash(data.password, 10);
    try {
      await createUser(data);
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
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full"
            {...register("name")}
          />
        </div>
        <div className="flex flex-col mt-6">
          <label htmlFor="email" className="text-xs ps-16  ">
            Email
          </label>{" "}
          <input
            type="mail"
            placeholder="pims@cat.be"
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full"
            {...register("email")}
          />
        </div>
        <div className="flex flex-col mt-6">
          <label htmlFor="password" className="text-xs ps-16  ">
            Mot de passe
          </label>{" "}
          <input
            type="password"
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full"
            {...register("password")}
          />
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
