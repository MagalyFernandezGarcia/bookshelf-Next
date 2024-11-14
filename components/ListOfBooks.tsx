"use server";

import Image from "next/image";
import UpdateBtn from "@/components/UpdateBtn";
import { Book } from "@prisma/client";
import Link from "next/link";
import DeleteBtn from "./DeleteBtn";

import greenBook from "@/images/greenBook.svg";
import redBook from "@/images/redBook.svg";

const ListOfBooks = async ({ currentArray }: { currentArray: Book[] }) => {
	const sizeIcon = 16;

	return (
		<section className="flex flex-col gap-4 mt-8">
			{currentArray.map((book) => {
				return (
					<div
						className="flex items-center justify-between  h-20 bg-[#E4B781] text-lg rounded-sm max-w-[320px] "
						key={book.id}
					>
						<Image
							src={!book.returned && !book.borrower ? greenBook : redBook}
							alt="book"
							width={20}
							height={20}
							className="ml-4 mr-4"
						/>
						<Link href={`/bookshelf/${book.id}`} className="text-center">
							{book.title}
						</Link>
						<div className="flex gap-1 mr-4 min-w-[48px] ml-4">
							<UpdateBtn sizeIcon={sizeIcon} />
							<DeleteBtn id={book.id} sizeIcon={sizeIcon} />
						</div>
					</div>
				);
			})}
		</section>
	);
};

export default ListOfBooks;
