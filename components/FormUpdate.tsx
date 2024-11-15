"use client";
import InputStyle from "./InputStyle";
import { BookData } from "@/app/types/Book";
import { getFullBook } from "@/app/db.service";
import { PromiseReturnType } from "@prisma/client/extension";
import { useForm } from "react-hook-form";
import HeartVote from "./HeartVote";
import { useState } from "react";
import Image from "next/image";

import upCat from "@/images/upCat.png";

const FormUpdate = ({
  currentBook,
}: {
  currentBook: NonNullable<PromiseReturnType<typeof getFullBook>>;
}) => {
  //type de la fonction getFullBook

  const { register, handleSubmit, setValue } = useForm<BookData>({
    defaultValues: {
      //transformer les données reçues par la fonctions pour qu'elles correspondent à BookData
      title: currentBook.title,
      volume: currentBook.volume,
      serie: currentBook.serie ?? undefined,
      author: currentBook.author.name,
      genre: currentBook.genre.name,
      resume: currentBook.resume,
      rating: currentBook.rating,
      returned: currentBook.returned,
      format: currentBook.format.name,
      borrower: currentBook.borrower ?? undefined,
      date: currentBook.date ? currentBook.date.toISOString() : undefined,
    },
  });

  const [resetState, setResetState] = useState(0);
  return (
    <form>
      <InputStyle labelTxt="title" register={register} registerName="title" />
      <section className="flex gap-4">
        <div>
          <InputStyle
            labelTxt="author"
            register={register}
            registerName="author"
          />
          <InputStyle
            labelTxt="genre"
            register={register}
            registerName="genre"
          />
        </div>
        <div>
          <InputStyle
            labelTxt="volume"
            register={register}
            registerName="volume"
          />
          <InputStyle
            labelTxt="serie"
            register={register}
            registerName="serie"
          />
        </div>
      </section>
      <HeartVote onSetValue={setValue} onReset={resetState} rating={currentBook.rating} />
      <div className="relative mt-16 flex justify-center ">
        <Image
          src={upCat}
          alt="playful cat"
          width={60}
          height={60}
          className="absolute top-[-60px] scale-x-[-1] right-[30px] "
        />
        <textarea
          className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-80 overflow-x-auto text-sm rounded-md"
          rows={7}
          id="resume"
          placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum provident commodi in perspiciatis. Error laudantium ut minus architecto corrupti aut illum reiciendis velit, perferendis officia vero vel fuga nemo atque."
          {...register("resume")}
        ></textarea>
      </div>
    </form>
  );
};

export default FormUpdate;
