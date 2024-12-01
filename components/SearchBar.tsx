"use client";


import { SubmitHandler, useForm } from "react-hook-form";
import glass from "@/images/search.svg";
import Image from "next/image";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "./Spinner";
import { useDebouncedCallback } from "use-debounce"


const SearchBar = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();
  const params = new URLSearchParams(searchParams);
  const researchResult: SubmitHandler<{ search: string }> = async (data) => {

    if (data.search) {
      params.delete("author");
      params.delete("genre");
      params.delete("format");
      params.delete("sort");
      params.delete("rating");
      params.set("searchbar", data.search);
    } else {
      params.delete("searchbar");
    }

    replace(`${pathName}?${params.toString()}`);

  
  };

  const { handleSubmit, register } = useForm<{ search: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2500);
  };

  const handleSearchParams = useDebouncedCallback((search: string) => {
    if (search !== "") {
      params.delete("author");
      params.delete("genre");
      params.delete("format");
      params.delete("sort");
      params.delete("rating");
      params.set("searchbar", search);
    } else {
      params.delete("searchbar");
    }
    replace(`${pathName}?${params.toString()}`);

    
  }, 500);

  return (
    <form
      onSubmit={handleSubmit(researchResult)}
      className=" flex flex-col  place-content-center relative lg:mb-8"
    >
      <input
        type="text"
        placeholder="Rechercher"
        className="bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-80 h-8 text-center rounded-2xl mt-6 lg:w-[600px]"
        {...register("search")}
        onChange={(e) => handleSearchParams(e.target.value)}
      />
      <button
        type="submit"
        className={`absolute right-4 ${
          isLoading ? "top-[0.5ch]" : "top-[3ch]"
        }`}
        onClick={() => handleClick()}
      >
        {isLoading ? (
          <Spinner size={20} />
        ) : (
          <Image src={glass} width={20} height={20} alt="magnifying glass" />
        )}
      </button>
    </form>
  );
};

export default SearchBar;
