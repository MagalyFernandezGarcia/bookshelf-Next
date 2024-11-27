"use client";

import Link from "next/link";
import Image from "next/image";
import add from "@/images/add.svg";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

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
      params.set("filter", e.target.value);
    } else {
      params.delete("filter");
    }
    replace(`${pathName}?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectFilter(e);
  };

  return (
    <form
      className="flex justify-between lg:mb-12"
      onSubmit={(e) => e.preventDefault()}
    >
      <select
        name="filter"
        onChange={handleChange}
        className="bg-[#E4B781] mt-6 text-center rounded-sm lg:w-[200px] "
      >
        <option value="">Filtrer par :</option>
        <option value="all">Tout</option>
        <option value="author">Auteur</option>
        <option value="genre">Genre</option>
        <option value="format">Format</option>
        <option value="rating">Avis</option>
        <option value="absent">Absent</option>
        <option value="present">Présent</option>
      </select>
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
