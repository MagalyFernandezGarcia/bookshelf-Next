"use server";

import Image from "next/image";

import UpdateBtn from "@/components/UpdateBtn";
import { useEffect, useState } from "react";
import { getBooks } from "@/app/db.service";
import { Book } from "@prisma/client";
import { deleteBook } from "@/app/db.service";

import greenBook from "@/images/greenBook.svg";
import redBook from "@/images/redBook.svg";
import trash from "@/images/trash.svg";
import Link from "next/link";
import DeleteBtn from "./DeleteBtn";

const ListOfBooks = async () => {
  const books = await getBooks();

  const sizeIcon = 16;

  return (
    <section className="flex flex-col gap-4 mt-8">
      {books.map((book) => {
        return (
          <div
            className="flex items-center justify-around  h-20 bg-[#E4B781] text-lg rounded-sm"
            key={book.id}
          >
            <Image
              src={!book.returned && !book.borrower ? greenBook : redBook}
              alt="book"
              width={20}
              height={20}
            />
            <Link href={`/bookshelf/${book.id}`}>{book.title}</Link>
            <div className="flex gap-4">
              <UpdateBtn sizeIcon={sizeIcon} />
              <DeleteBtn id={book.id} sizeIcon={sizeIcon} />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ListOfBooks;
