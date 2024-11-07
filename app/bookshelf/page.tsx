"use server";

import Link from "next/link";
import Image from "next/image";

import SearchBar from "@/components/SearchBar";


import add from "@/images/add.svg";
import ListOfBooks from "@/components/ListOfBooks";


const Page = async () => {

  

  

  return (
    <>
      <SearchBar />

      <div className="flex justify-between ">
        <select className="bg-[#E4B781]  mt-6  text-center">
          <option value="Tout">Filtrer par : </option>
          <option value="author">Auteur</option>
          <option value="genre">Genre</option>
          <option value="format">Format</option>
          <option value="rating">Avis</option>
          <option value="absent">Absent</option>
          <option value="present">Présent</option>
        </select>
        <Link
          href="/"
          className="flex gap-2 mt-6 bg-[#E4B781] w-6 h-6  justify-center items-center"
        >
          <Image src={add} alt="plus" width={18} height={18} />
        </Link>
      </div>
      <ListOfBooks />
    </>
  );
};

export default Page;
