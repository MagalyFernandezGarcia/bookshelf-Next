import Image from "next/image";
import UpdateBtn from "@/components/Buttons/UpdateBtn";
import { Book } from "@prisma/client";
import Link from "next/link";
import DeleteBtn from "./Buttons/DeleteBtn";

import greenBook from "@/images/greenBook.svg";
import redBook from "@/images/redBook.svg";

const ListOfBooks = ({ currentArray }: { currentArray: Book[] }) => {
  const sizeIcon = 16;

  if (currentArray.length === 0)
    return (
      <section className="flex justify-center items-center pt-24">
        <button className="bg-[#E4B781] text-lg rounded-sm ">
          <Link href="/">Ajouter un livre</Link>
        </button>
      </section>
    );

  if (currentArray.length > 0) {
    return (
      <section className="flex flex-col gap-4 mt-8 lg:w-[600px]">
        {currentArray
          .sort((a, b) => b.id - a.id)
          .map((book) => {
            return (
              <div
                className="flex items-center justify-between  h-20 bg-[#E4B781] text-lg rounded-sm max-w-[320px] lg:max-w-[600px]    "
                key={book.id}
              >
                <div  className="relative lg:w-[30px]">
                <Image
                  src={!book.returned && !book.borrower ? greenBook : redBook}
                  alt="book"
                  width={20}
                  height={20}
                  className="ml-4 mr-4 lg:ml-8 lg:mr-8 lg:w-full lg:h-auto "
                />
                </div>
                <Link href={`/bookshelf/${book.id}`} className="text-center">
                  {book.title}
                </Link>
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
};

export default ListOfBooks;
