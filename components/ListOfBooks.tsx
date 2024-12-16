"use client";

import Image from "next/image";
import UpdateBtn from "@/components/Buttons/UpdateBtn";
import { Book } from "@prisma/client";
import Link from "next/link";
import DeleteBtn from "./Buttons/DeleteBtn";

import greenBook from "@/images/greenBook.svg";
import redBook from "@/images/redBook.svg";

import Spinner from "./Spinner";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import sitCat from "@/images/sitCat.png";


const ListOfBooks = ({
  currentArray,
 
}: {
  currentArray: Book[];
 
}) => {
  const sizeIcon = 16;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [isLoading, setIsLoading] = useState(false);

  if (currentArray.length > 0) {
    if (isLoading) return <Spinner size={40} />;
    if (!isLoading) {
      return (
        <section className="flex flex-col gap-4 mt-8 lg:w-[600px]">
          {currentArray .length > 0 && (
            <Image
						src={sitCat}
						alt="cat"
						width={80}
						height={80}
						className="absolute right-10  top-[-40px] lg:right-20"
					/>
          )}
          {currentArray
            .sort((a, b) => b.id - a.id)
            .map((book) => {
              return (
                <div
                  className="flex items-center justify-between  h-20 bg-[#E4B781] text-lg rounded-sm max-w-[320px] lg:max-w-[600px]    "
                  key={book.id}
                >
                  <div className="relative lg:w-[30px]">
                    <Image
                      src={
                        !book.returned && !book.borrower ? greenBook : redBook
                      }
                      alt="book"
                      width={20}
                      height={20}
                      className="ml-4 mr-4 lg:ml-8 lg:mr-8 lg:w-full lg:h-auto "
                    />
                  </div>
                  <button onClick={() => setIsLoading(true)}>
                    <Link
                      href={`/bookshelf/${book.id}?${params.toString()}`}
                      className="text-center"
                    >
                      {book.title}
                    </Link>
                  </button>
                  <div className="flex gap-3 mr-4 min-w-[48px] ml-4 relative lg:w-[55px] ">
                    <UpdateBtn sizeIcon={sizeIcon} id={book.id} />
                    <DeleteBtn id={book.id} sizeIcon={sizeIcon} />
                  </div>
                </div>
              );
            })}
        </section>
      );
    }
  }else{
    return (<section className="flex justify-center flex-col gap-12 items-center pt-24">
      <p>Pas de résultat trouvé, voulez-vous ajouter un livre?</p>
      <button className="bg-[#E4B781] text-lg rounded-sm p-2">
        <Link href="/">Ajouter un livre</Link>
      </button>
    </section>)
  }
};

export default ListOfBooks;
