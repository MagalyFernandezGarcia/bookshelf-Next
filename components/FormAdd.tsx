"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import InputStyle from "@/components/InputStyle";
import HeartVote from "@/components/HeartVote";
import Switch from "@/components/Switch";
import FormatChoice from "@/components/FormatChoice";
import { useState } from "react";

import Image from "next/image";
import check from "@/images/check-solid.svg";
import eraser from "@/images/eraser-solid.svg";

import restCat from "@/images/restCat.png";
import catBorder from "@/images/catBorder.png";

import Modal from "@/components/Modals/Modal";

import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/components/Spinner";
import { BookData, BookSchema } from "@/app/types/Book";
import { createBook } from "@/app/db.service";

// import { addBook } from "@/app/scripts/createUser";

const FormAdd = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookData>({
    defaultValues: {
      title: "",
      volume: 1,
      serie: "",
      author: "",
      genre: "",
      resume: "",
      rating: 3,
      returned: false,
      format: "",
      borrower: "",
      date: "",
    },
    resolver: zodResolver(BookSchema),
  });

 
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleFillArray, setToggleFillArray] = useState<boolean[]>(
    Array(5)
      .fill(false)
      .map((_, index) => index < 3)
  );
  const [format, setFormat] = useState("");
  const onSubmit: SubmitHandler<BookData> = async (data) => {
    setIsLoading(true);

    if (data.borrower && !data.date) {
      data.date = new Date().toISOString();
    }
    if (data.format === "kindle") {
      data.date = "";
      data.borrower = "";
    }

    const { success, data: validatedBook } = BookSchema.safeParse(data);

    if (success) {
      try {
        await createBook(validatedBook);

        setShowModal(true);
        setToggleFillArray(
          Array(5)
            .fill(false)
            .map((_, index) => index < 3)
        );
        setFormat("");
      } catch (error) {
        setShowModal(true);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setShowModal(true);
      setError(true);
    }
  };

  const handleModal = () => {
    setShowModal(false);
    setError(false);

    reset();
  };

  return (
    <form className="flex flex-col  relative" onSubmit={handleSubmit(onSubmit)}>
      {/* <button type="button" onClick={() => addBook()}>Import books</button> */}
      {showModal ? (
        <Modal
          modalContent={!error ? "Livre ajouté à la bibliothèque" : "oups"}
          onSetModal={handleModal}
        />
      ) : null}
      <InputStyle
        labelTxt="Titre"
        placeholder="Titre d'un chouette livre"
        register={register}
        registerName="title"
        error={errors}
      />
      <Image
        src={restCat}
        alt="restCat"
        width={60}
        height={60}
        className="absolute top-1 left-1"
      />

      <InputStyle
        labelTxt="Volume"
        placeholder="1"
        register={register}
        registerName="volume"
        error={errors}
      />
      <InputStyle
        labelTxt="Série"
        placeholder="Une super série"
        register={register}
        registerName="serie"
        error={errors}
      />
      <InputStyle
        labelTxt="Auteur"
        placeholder="Yvan Dailivre"
        register={register}
        registerName="author"
        error={errors}
      />
      <InputStyle
        labelTxt="Genre"
        placeholder="Fantasy"
        register={register}
        registerName="genre"
        error={errors}
      />
      <div className="flex flex-col mt-6">
        <label className="text-xs ps-16 " htmlFor="resume">
          Résumé
        </label>
        <div className="relative">
          <Image
            src={catBorder}
            alt="catBorder"
            width={60}
            height={60}
            className="absolute rotate-90 right-[-20px] top-[-34px] "
          />
          <textarea
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-80 overflow-x-auto text-sm rounded-md lg:w-[600px]"
            rows={7}
            id="resume"
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum provident commodi in perspiciatis. Error laudantium ut minus architecto corrupti aut illum reiciendis velit, perferendis officia vero vel fuga nemo atque."
            {...register("resume")}
          ></textarea>
          {errors.resume && (
            <p className="text-xs text-red-500">{errors.resume.message}</p>
          )}
        </div>
      </div>
      <div>
        <HeartVote
          onSetValue={setValue}
          heartArray={toggleFillArray}
          onToggle={setToggleFillArray}
        />
        {errors.rating && (
          <p className="text-xs text-red-500">{errors.rating.message}</p>
        )}
      </div>
      <Switch register={register} />

      <FormatChoice
        register={register}
        error={errors}
        onSetValue={setValue}
        format={format}
        onSetFormat={setFormat}
        updateForm={false}
      />
      <div className="flex mt-6 gap-5  lg:mt-24 lg:justify-center">
        <button
          type="reset"
          className="w-[150px] h-24 bg-[#E8CAA7] flex items-center justify-center mb-6  hover:bg-[#ecd3b4]"
          disabled={isLoading}
        >
          <Image src={eraser} width={40} height={40} alt="eraser" />
        </button>
        <button
          type="submit"
          className="w-[150px] h-24 bg-[#794822] flex items-center justify-center mb-6  hover:bg-[#b66f38]"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner size={40} />
          ) : (
            <Image src={check} width={40} height={40} alt="check" />
          )}
        </button>
      </div>
    </form>
  );
};

export default FormAdd;
