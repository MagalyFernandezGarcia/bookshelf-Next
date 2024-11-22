import Link from "next/link"
import { useForm } from "react-hook-form";

const Account = ()=>{
    const { register, handleSubmit } = useForm({});
    return(
        <div className="flex flex-col justify-center items-center mt-36">
        <h2 className="text-2xl font-bold">Login</h2>
      <form action=""  className="flex flex-col justify-center items-center mt-8">
      <div className="flex flex-col mt-6">
          <label htmlFor="name" className="text-xs ps-16  ">
            Email
          </label>{" "}
          <input
            type="text"
            placeholder="Jaimie Lyre"
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full"
            {...register("email")}
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
            type="text"
            
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full"
            {...register("password")}
          />
        </div>
        

        <button type="submit" className="mt-12 bg-[#794822] p-4 rounded-lg text-[#F8D8B1]">S'identifier</button>
        <Link href="/account" className="mt-4">Créer un compte</Link>
      </form>
    </div>
    )
}
export default Account