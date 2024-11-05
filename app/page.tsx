"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import InputStyle from "@/components/InputStyle";
import HeartVote from "@/components/HeartVote";
import Switch from "@/components/Switch";
import FormatChoice from "@/components/FormatChoice";
import Image from "next/image";
import check from "./images/check-solid.svg";
import eraser from "./images/eraser-solid.svg";
import { useState } from "react";

export interface BookData {
  title: string;
  volume: number;
  serie: string;
  author: string;
  genre: string;
  resume: string;
  rating: number;
  returned: boolean;
  format: string;
  borrower: string;
  date: string;
}

export default function Home() {
  const { register, handleSubmit, setValue } = useForm<BookData>({
    defaultValues: {
      title: "",
      volume: 0,
      serie: "",
      author: "",
      genre: "",
      resume: "",
      rating: 0,
      returned: false,
      format: "",
      borrower: "",
      date: "",
    },
  });

  const [resetState, setResetState] = useState(false)
  const onSubmit: SubmitHandler<BookData> = (data) => console.log(data);
  return (
    <>
      <h1>Ajouter un livre</h1>
      <form
        className="place-content-center }"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputStyle
          labelTxt="Titre"
          placeholder="Titre d'un chouette livre"
          register={register}
          registerName="title"
        />
        <InputStyle
          labelTxt="Volume"
          placeholder="1"
          register={register}
          registerName="volume"
        />
        <InputStyle
          labelTxt="Série"
          placeholder="Une super série"
          register={register}
          registerName="serie"
        />
        <InputStyle
          labelTxt="Auteur"
          placeholder="Yvan Dailivre"
          register={register}
          registerName="author"
        />
        <InputStyle
          labelTxt="Genre"
          placeholder="Fantasy"
          register={register}
          registerName="genre"
        />
        <div className="flex flex-col mt-6">
          <label className="text-xs ps-16 " htmlFor="resume">
            Résumé
          </label>
          <textarea
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-80 overflow-x-auto text-sm"
            rows={7}
            id="resume"
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum provident commodi in perspiciatis. Error laudantium ut minus architecto corrupti aut illum reiciendis velit, perferendis officia vero vel fuga nemo atque."
            {...register("resume")}
          ></textarea>
        </div>
        <HeartVote onSetValue={setValue} onReset={resetState} />
        <Switch register={register} />
        <FormatChoice register={register} onReset={resetState} />
        <div className="flex  mt-6 gap-5">
          <button
            type="reset"
            className="w-[150px] h-24 bg-[#E8CAA7] flex items-center justify-center mb-6"
			onClick={() => setResetState(!resetState)}
          >
            {" "}
            <Image src={eraser} width={40} height={40} alt="eraser" />
          </button>
          <button
            type="submit"
            className="w-[150px] h-24 bg-[#794822] flex items-center justify-center mb-6"
          >
            <Image src={check} width={40} height={40} alt="check" />{" "}
          </button>
        </div>
      </form>
    </>
  );
}
