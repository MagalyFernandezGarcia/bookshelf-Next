"use client";

import Image from "next/image";
import DeleteBtn from "@/components/DeleteBtn";
import UpdateBtn from "@/components/UpdateBtn";
import { use, useEffect, useState } from "react";
import { getBooks } from "@/app/db.service";
import { Book } from "@prisma/client";
import { deleteBook } from "@/app/db.service";

import greenBook from "@/images/greenBook.svg";
import redBook from "@/images/redBook.svg";
import trash from "@/images/trash.svg";

const ListOfBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
    };
    fetchBooks();
  }, []);

  const sizeIcon = 16;

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      console.log("Book deleted successfully");
    } catch (error) {
      console.error("Failed to delete book:", error);
      console.log(error);
    }
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <section className="flex flex-col gap-4 mt-8">
      {books.map((book) => {
        return (
          <div
            className="flex items-center justify-around  h-20 bg-[#E4B781] "
            key={book.id}
          >
            <Image
              src={!book.returned && !book.borrower ? greenBook : redBook}
              alt="book"
              width={20}
              height={20}
            />
            {book.title}
            <div className="flex gap-4">
              <UpdateBtn sizeIcon={sizeIcon} />
              <Image
                src={trash}
                alt="trash"
                width={sizeIcon}
                height={sizeIcon}
                onClick={() => handleDelete(book.id)}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ListOfBooks;
