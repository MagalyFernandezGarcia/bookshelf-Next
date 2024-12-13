"use client";

import { Author, Format, Serie } from "@prisma/client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import Spinner from "./Spinner";
import Switch from "./Switch";
import { lendSerie } from "@/app/db.service";

import SerieModal from "./Modals/SerieModal";

const GeneralChoice = ({
	valueChoice,
	sort,
	format,
	series,
}: {
	valueChoice?: Author[];
	format?: Format[];
	sort: string;
	series?: Serie[];
}) => {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathName = usePathname();

	const handleClick = (id: number) => {
		setIsLoading(true);
		const params = new URLSearchParams(searchParams);
		if (params.has("searchbar")) {
			params.delete("searchbar");
			params.set("author", id.toString());
		}

		if (id) {
			params.set(sort, id.toString());
		} else {
			params.delete(sort);
		}

		replace(`${pathName}?${params.toString()}`);
	};
	const [isLoading, setIsLoading] = useState(false);
	const [modal, setModal] = useState(0);
	const router = useRouter();

	if (valueChoice) {
		return (
			<>
				{isLoading ? (
					<Spinner size={40} />
				) : (
					<section className="flex flex-col gap-4 mt-8">
						{valueChoice.map((choice) => {
							return (
								<p
									key={choice.id}
									onClick={() => handleClick(choice.id)}
									className="flex items-center justify-around  h-20 bg-[#E4B781] text-lg rounded-sm"
								>
									{choice.name}
								</p>
							);
						})}
					</section>
				)}
			</>
		);
	}

	if (format) {
		return (
			<>
				{isLoading ? (
					<Spinner size={40} />
				) : (
					<section className="flex flex-col gap-4 mt-8">
						{format.map((format) => {
							return (
								<p
									key={format.id}
									onClick={() => handleClick(format.id)}
									className="flex items-center justify-around  h-20 bg-[#E4B781] text-lg rounded-sm"
								>
									{format.name}
								</p>
							);
						})}
					</section>
				)}
			</>
		);
	}

	if (series) {
		return (
			<>
				{isLoading ? (
					<Spinner size={40} />
				) : (
					<section className="flex flex-col gap-4 mt-8">
						{series.map((serie) => {
							function handleSwitch() {
								console.log("Current lend value:", serie.lend);
								if (serie.lend === true) {
									try {
										lendSerie(serie.id, "", "", false);
										console.log(
											"lendSerie called to set lend to false for:",
											serie.id
										);
										console.log("Modal should not appear, modal state:", modal);

										router.refresh();
									} catch (error) {
										console.log(error);
									}
								} else {
									console.log("lend is false, setting modal:", serie.id);
									setModal(serie.id);
								}
							}
							return (
								<Fragment key={serie.id}>
									<p>{serie.id}</p>
									{modal !== 0 ? (
										<SerieModal id={modal} onSetModal={() => setModal(0)} />
									) : (
										<div className="flex items-center justify-between pl-4 pr-4  h-20 bg-[#E4B781] text-lg rounded-sm">
											<p onClick={() => handleClick(serie.id)}>{serie.name}</p>
											<div className="mb-12 ">
												<Switch serie={serie} onSwitch={handleSwitch} />
											</div>
										</div>
									)}
								</Fragment>
							);
						})}
					</section>
				)}
			</>
		);
	}
};

export default GeneralChoice;
