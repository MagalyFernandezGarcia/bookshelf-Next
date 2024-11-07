"use server"

import Link from "next/link";
import Image from "next/image";

import SearchBar from "@/components/SearchBar";
import { getBooks } from "../db.service";
import DeleteBtn from "@/components/DeleteBtn";
import UpdateBtn from "@/components/UpdateBtn";

import add from "@/images/add.svg";
import greenBook from "@/images/greenBook.svg";
import redBook from "@/images/redBook.svg";



const Page = async () => {
  const books = await getBooks();

  const sizeIcon = 16;

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
      <section className="flex flex-col gap-4 mt-8">
        {books.map((book) => {
          return (
            <div className="flex items-center justify-around  h-20 bg-[#E4B781] " key={book.id}>
              <Image
                src={!book.returned && !book.borrower ? greenBook : redBook}
                alt="book"
                width={20}
                height={20}
              />
              {book.title}
              <div className="flex gap-4">
				<UpdateBtn sizeIcon={sizeIcon} />
                <DeleteBtn sizeIcon={sizeIcon} id={book.id} /> 
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Page;
