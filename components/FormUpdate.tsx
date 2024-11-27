"use client";
import InputStyle from "./InputStyle";
import { BookData, BookSchema } from "@/app/types/Book";
import { getFullBook, updateBook } from "@/app/db.service";
import { PromiseReturnType } from "@prisma/client/extension";
import { SubmitHandler, useForm } from "react-hook-form";
import HeartVote from "./HeartVote";
import { useState } from "react";
import Image from "next/image";
import FormatChoice from "./FormatChoice";

import upCat from "@/images/upCat.png";
import check from "@/images/check-solid.svg";
import eraser from "@/images/eraser-solid.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import ConfirmModal from "./Modals/ConfirmModal";

const FormUpdate = ({
	currentBook,
}: {
	currentBook: NonNullable<PromiseReturnType<typeof getFullBook>>;
}) => {
	//type de la fonction getFullBook

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<BookData>({
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
			date: currentBook.date
				? currentBook.date.toISOString().split("T")[0]
				: undefined,
		},
		resolver: zodResolver(BookSchema),
	});

	const [resetState, setResetState] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const onSubmit: SubmitHandler<BookData> = async (data) => {
		if (data.borrower && !data.date) {
			data.date = new Date().toISOString();
		}

		const { success, data: validatedBook } = BookSchema.safeParse(data);

		if (success) {
			setShowModal(true);
			try {
				await updateBook(validatedBook, currentBook.id);
				setResetState(+1);
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("db issues");
		}
	};
	const handleModal = () => {
		setShowModal(false);
	};

	if (showModal) {
		return <ConfirmModal onSetModal={handleModal} />;
	}
	if (!showModal) {
		return (
			<>
				<form onSubmit={handleSubmit(onSubmit)} className="lg:w-[600px]">
					<InputStyle
						labelTxt="title"
						register={register}
						registerName="title"
						error={errors}
						
					/>
					<section className="flex gap-4 ">
						<div>
							<InputStyle
								labelTxt="author"
								register={register}
								registerName="author"
								error={errors}
							/>
							<InputStyle
								labelTxt="genre"
								register={register}
								registerName="genre"
								error={errors}
							/>
						</div>
						<div>
							<InputStyle
								labelTxt="volume"
								register={register}
								registerName="volume"
								error={errors}
							/>
							<InputStyle
								labelTxt="serie"
								register={register}
								registerName="serie"
								error={errors}
							/>
						</div>
					</section>
					<HeartVote
						onSetValue={setValue}
						onReset={resetState}
						rating={currentBook.rating}
					/>
					{errors.rating && (
						<p className="text-xs text-red-500">{errors.rating.message}</p>
					)}
					<div className="relative mt-16 flex justify-center ">
						<Image
							src={upCat}
							alt="playful cat"
							width={60}
							height={60}
							className="absolute top-[-60px] scale-x-[-1] right-[30px] "
						/>
						<textarea
							className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 p-4 w-80 overflow-x-auto text-sm rounded-md lg:w-[600px] "
							rows={7}
							id="resume"
							placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum provident commodi in perspiciatis. Error laudantium ut minus architecto corrupti aut illum reiciendis velit, perferendis officia vero vel fuga nemo atque."
							{...register("resume")}
						></textarea>
						{errors.resume && (
							<p className="text-xs text-red-500">{errors.resume.message}</p>
						)}
					</div>
					<FormatChoice
						register={register}
						onReset={resetState}
						error={errors}
						currentFormat={currentBook.format.name}
						currentDate={currentBook.date}
					/>
					<section className="flex justify-between mt-12 ">
						<button
							type="reset"
							className="w-[150px] h-24 bg-[#E8CAA7] flex items-center justify-center mb-6 relative  "
						>
							<Image src={eraser} alt="reset" width={40} height={40}  />
						</button>
						<button
							type="submit"
							className="w-[150px] h-24 bg-[#794822] flex items-center justify-center mb-6 "
						>
							<Image src={check} alt="check" width={40} height={40} />
						</button>
					</section>
				</form>
			</>
		);
	}
};

export default FormUpdate;
