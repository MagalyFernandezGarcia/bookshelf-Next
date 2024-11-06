"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import InputStyle from "@/components/InputStyle";
import HeartVote from "@/components/HeartVote";
import Switch from "@/components/Switch";
import FormatChoice from "@/components/FormatChoice";
import { useState } from "react";
import Link from "next/link";

import Image from "next/image";
import check from "@/images/check-solid.svg";
import eraser from "@/images/eraser-solid.svg";
import arrow from "@/images/right-arrow.svg";
import restCat from "@/images/restCat.png";
import catBorder from "@/images/catBorder.png";
import { z } from "zod";

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

const bookSchema = z.object({
	title: z.string(),
	volume: z.number(),
	serie: z.string(),
	author: z.string(),
	genre: z.string(),
	resume: z.string(),
	rating: z.number(),
	returned: z.boolean(),
	format: z.string(),
	borrower: z.string(),
	date: z.string(),
});

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

	const [resetState, setResetState] = useState(false);
	const onSubmit: SubmitHandler<BookData> = (data) => {
		console.log(data);
	};
	return (
		<div className="flex flex-col items-center">
			<Link href="/bookshelf" className="flex gap-2 ml-[25ch] mt-4  ">
				Bibliothèque <Image src={arrow} alt="arrow" width={20} height={20} />
			</Link>
			<h1 className="text-xl mt-4 ">Ajouter un livre</h1>
			<form
				className="flex flex-col  relative"
				onSubmit={handleSubmit(onSubmit)}
			>
				<InputStyle
					labelTxt="Titre"
					placeholder="Titre d'un chouette livre"
					register={register}
					registerName="title"
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
						className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-80 overflow-x-auto text-sm rounded-md"
						rows={7}
						id="resume"
						placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum provident commodi in perspiciatis. Error laudantium ut minus architecto corrupti aut illum reiciendis velit, perferendis officia vero vel fuga nemo atque."
						{...register("resume")}
					></textarea>
					<Image
						src={catBorder}
						alt="catBorder"
						width={60}
						height={60}
						className="absolute rotate-90 left-[32.5ch] top-[42ch]"
					/>
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
		</div>
	);
}
