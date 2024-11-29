"use client";

import Image from "next/image";
import UpdateBtn from "@/components/Buttons/UpdateBtn";
import { Book } from "@prisma/client";
import Link from "next/link";
import DeleteBtn from "./Buttons/DeleteBtn";

import greenBook from "@/images/greenBook.svg";
import redBook from "@/images/redBook.svg";
import { FormEventHandler, useState } from "react";
import Spinner from "./Spinner";
import { useSearchParams } from "next/navigation";
import Switch from "./Switch";
import { lendSerie } from "@/app/db.service";

const ListOfBooks = ({
  currentArray,
  serie,
}: {
  currentArray: Book[];
  serie?: boolean;
}) => {
  const sizeIcon = 16;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [lend, setLend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitch = () => {
    setLend((prev) => !prev);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const data = event.currentTarget;
    const serieParam = params.get("serie");
    const id = serieParam ? parseInt(serieParam, 10) : null;

    if (!id) {
      console.error("Invalid or missing 'serie' parameter");
      return;
    }
    const date=  new Date(data.date.value)
    
    
    
    
    

    setLend(false);
    setIsLoading(true);
    try {
      lendSerie(id, data.borrower.value, date.toISOString())
      .then(() => {
        setIsLoading(false);
        console.log("Update successful!")
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (currentArray.length > 0) {
    if (isLoading) return <Spinner size={40} />;
    if (!isLoading) {
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
          {serie && <Switch serie={currentArray} onSetLend={handleSwitch} />}
          {lend && (
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <section className="flex  gap-2">
                <div className="flex flex-col mt-6">
                  <label htmlFor="borrower" className="text-xs ps-16">
                    Emprunteur
                  </label>{" "}
                  <input
                    type="text"
                    name="borrower"
                    placeholder="Jerem Aitrait"
                    required
                    className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full  "
                  />
                </div>
                <div className="flex flex-col mt-6">
                  <label htmlFor="date" className="text-xs ps-16">
                    Date
                  </label>{" "}
                  <input
                    type="date"
                    name="date"
                    className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 h-8 text-center rounded-md w-full  "
                  />
                </div>
              </section>
              <button className="w-[150px] text-[#F8D8B1] mt-8 bg-[#794822] flex items-center justify-center h-8 rounded-md  hover:bg-[#b66f38]">
                Valider
              </button>
            </form>
          )}
        </section>
      );
    }
  }
};

export default ListOfBooks;
