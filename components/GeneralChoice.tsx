"use client";

import { Author } from "@prisma/client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "./Spinner";


const GeneralChoice = ({
	valueChoice,
	sort,
}: {
	valueChoice: Author[];
	sort: string;
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

	return (<>
	{isLoading ? <Spinner size={40}/> : <section className="flex flex-col gap-4 mt-8">
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
		</section>}
		
		
		</>
	);
};

export default GeneralChoice;
