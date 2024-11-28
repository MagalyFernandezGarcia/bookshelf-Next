"use client";

import Link from "next/link";
import Image from "next/image";
import add from "@/images/add.svg";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "./Spinner";
import SortBtn from "./Buttons/SortBtn";

const Filter = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();
  const selectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    
    const params = new URLSearchParams(searchParams);

    if (e) {
      params.delete("author");
      params.delete("genre");
      params.delete("format");
      params.delete("searchbar");
      params.delete("sort");
      params.set("filter", e.target.value);
    } else {
      params.delete("filter");
    }
    replace(`${pathName}?${params.toString()}`);
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectFilter(e);
    setIsLoading(true)
		setTimeout(()=>setIsLoading(false), 1400)
  };



	if(isLoading) return <Spinner size={40}/>

  return (
    <form
      className="flex justify-between lg:mb-12 items-end"
      onSubmit={(e) => e.preventDefault()}
    >
      
      <select
        name="filter"
        onChange={handleChange}
        className="bg-[#E4B781] mt-6 text-center rounded-sm lg:w-[200px] p-2 "
      
      >
        <option value="">Filtrer par :</option>
        <option value="all">Tout</option>
        <option value="rating">Avis</option>
        <option value="absent">Absent</option>
        <option value="present">Présent</option>
        <option value="lend">Prêtés</option>
      </select>

      <div className=" flex justify-center gap-4  ">
        <SortBtn value="author" />
        <SortBtn value="genre" />
        <SortBtn value="format" />
      </div>
      <Link
        href="/"
        className="flex gap-2 mt-6 bg-[#E4B781] p-2 rounded-sm justify-center items-center hover:scale-150"
      >
        <Image src={add} alt="plus" width={18} height={18} />
      </Link>
    </form>
  );
};

export default Filter;
