"use client";

import { Author } from "@prisma/client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const GeneralChoice = ({
	valueChoice,
	filter,
}: {
	valueChoice: Author[];
	filter: string;
}) => {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathName = usePathname();

	const handleClick = (id: number) => {
		const params = new URLSearchParams(searchParams);

		if (id) {
			params.set(filter, id.toString());
		} else {
			params.delete(filter);
		}

		replace(`${pathName}?${params.toString()}`);
	};

	return (
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
	);
};

export default GeneralChoice;
