import { getFullBook } from "@/app/db.service";

import FormUpdate from "@/components/FormUpdate";
import Link from "next/link";
import Image from "next/image";
import arrow from "@/images/right-arrow.svg";

interface BookPageProps {
	params: { id: string };
}

const updatePage = async ({ params }: BookPageProps) => {
	const { id } = params;

	const currentBook = await getFullBook(parseInt(id));

	//vérifie que currentBook n'est pas undefined
	if (currentBook) {
		return (
			<>
				<Link
					href={`/bookshelf/${currentBook.id}`}
					className="flex gap-2  mt-4  "
				>
					<Image
						src={arrow}
						alt="arrow"
						width={20}
						height={20}
						className="rotate-180"
					/>
					retour
				</Link>
				<FormUpdate currentBook={currentBook} />
			</>
		);
	}

	return <div>404</div>;
};

export default updatePage;
