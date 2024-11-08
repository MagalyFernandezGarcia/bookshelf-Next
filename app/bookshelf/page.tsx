import Link from "next/link";
import Image from "next/image";

import SearchBar from "@/components/SearchBar";

import add from "@/images/add.svg";
import ListOfBooks from "@/components/ListOfBooks";
import { getAuthors, getBooks } from "../db.service";
import { Book } from "@prisma/client";

const Page = async () => {
  let value  = "present";
  let currentArray :Book[] = []
  

  

  switch(value){
    
    case "present"  :
      const test = await getBooks();
      currentArray = test.filter((book) => book.borrower !== null && book.returned !== true);

      break;
    default :
      currentArray = await getBooks();
    }


  
  return (
    <>
      <SearchBar />

      <div className="flex justify-between ">
        <select className="bg-[#E4B781]  mt-6  text-center">
          <option value="all">Filtrer par : </option>
          <option value="author">Auteur</option>
          <option value="genre">Genre</option>
          <option value="format">Format</option>
          <option value="rating">Avis</option>
          <option value="absent">Absent</option>
          <option value="present">Présent</option>
        </select>
        <Link
          href="/"
          className="flex gap-2 mt-6 bg-[#E4B781] p-2 rounded-sm justify-center items-center"
        >
          <Image src={add} alt="plus" width={18} height={18} />
        </Link>
      </div>
      <ListOfBooks currentArray={currentArray} />
    </>
  );
};

export default Page;
