"use client";

import { searchBooks } from "@/app/db.service";
import { SubmitHandler, useForm } from "react-hook-form";
import glass from "@/images/search.svg";
import Image from "next/image";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

const SearchBar = () => {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathName = usePathname();
	const researchResult: SubmitHandler<{ search: string }> = async (data) => {
		const params = new URLSearchParams(searchParams);

		if (data.search) {
			params.delete("author");
			params.delete("genre");
			params.delete("format");
			params.set("searchbar", data.search);
		} else {
			params.delete("searchbar");
		}

		replace(`${pathName}?${params.toString()}`);

		const array = await searchBooks(data.search);
		console.log(array);
	};

	const { handleSubmit, register } = useForm<{ search: string }>();

	return (
		<form
			onSubmit={handleSubmit(researchResult)}
			className=" flex flex-col  place-content-center relative lg:mb-8"
		>
			<input
				type="text"
				placeholder="Rechercher"
				className="bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-80 h-8 text-center rounded-2xl mt-6 lg:w-[600px]"
				{...register("search")}
			/>
			<button type="submit" className="absolute right-4 top-[3ch]">
				<Image src={glass} width={20} height={20} alt="magnifying glass" />
			</button>
		</form>
	);
};

export default SearchBar;
