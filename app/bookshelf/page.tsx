import Link from "next/link";
import Image from "next/image"
import { useForm } from "react-hook-form";

import add from "@/images/add.svg"

const Page = () => {
  return (
    <>
      <form className=" flex flex-col  place-content-center relative">
        <input
          type="text"
          placeholder="Rechercher"
          className="bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-80 h-8 text-center rounded-2xl mt-6"
        />
        <div className="flex justify-between ">
        <select className="bg-[#E4B781]  mt-6 w-[34%] text-center">
          <option value="Tout">Filtrer par : </option>
          <option value="author">Auteur</option>
          <option value="genre">Genre</option>
          <option value="format">Format</option>
          <option value="rating">Avis</option>
          <option value="absent">Absent</option>
          <option value="present">Présent</option>
        </select>
        <Link href="/" className="flex gap-2 mt-6 bg-[#E4B781] w-6 h-6 flex justify-center items-center"><Image src={add} alt="plus" width={18} height={18} /></Link>
        </div>
      </form>
    </>
  );
};

export default Page;
