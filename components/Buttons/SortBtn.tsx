"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import Spinner from "../Spinner";

const SortBtn = ({ value }: { value: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const sortParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();
  const selectSort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const params = new URLSearchParams(sortParams);
    if (e) {
      params.delete("filter");  
      params.delete("searchbar");
      params.delete("sort");
      params.delete("author");
      params.delete("genre");
      params.delete("format");
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    replace(`${pathName}?${params.toString()}`);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    selectSort(e);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1400);
   
  };

  return (
    <>
      {isLoading ? (
        <Spinner size={40} />
      ) : (
        <button
          className="bg-[#E4B781] p-2 text-center rounded-sm hover:bg-[#ecd3b4] h-[36px]"
          value={value}
          onClick={handleClick}
        >
          {value === "author"? "Auteurs" : value === "genre" ? "Genres" : "Formats"}
        </button>
      )}
    </>
  );
};

export default SortBtn;
