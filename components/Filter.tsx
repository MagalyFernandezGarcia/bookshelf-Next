"use client";

import Link from "next/link";
import Image from "next/image";
import add from "@/images/add.svg";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Filter = () => {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathName = usePathname();
	const selectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const params = new URLSearchParams(searchParams);

		if (e) {
			params.set("filter", e.target.value);
		} else {
			params.delete("filter");
		}
		replace(`${pathName}?${params.toString()}`);
	};

	const handleFilterChange = (newFilter: string) => {
		const params = new URLSearchParams(window.location.search);
		params.delete("author");
		params.delete("genre");
		params.set("filter", newFilter);
		const newUrl = `${window.location.pathname}?${params.toString()}`;
		window.location.href = newUrl;
	};

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		selectFilter(e);
		handleFilterChange(e.target.value);
	};

	return (
		<form className="flex justify-between" onSubmit={(e) => e.preventDefault()}>
			<select
				name="filter"
				onChange={handleChange}
				className="bg-[#E4B781] mt-6 text-center"
			>
				<option value="all">Filtrer par :</option>
				<option value="author">Auteur</option>
				<option value="genre">Genre</option>
				<option value="format">Format</option>
				<option value="rating">Avis</option>
				<option value="absent">Absent</option>
				<option value="present">Présent</option>
			</select>
			<Link
				href="/"
				className="flex gap-2 mt-6 bg-[#E4B781] p-2 rounded-sm justify-center items-center"
			>
				<Image src={add} alt="plus" width={18} height={18} />
			</Link>
		</form>
	);
};

export default Filter;
