import { getFullBook, updateBook } from "@/app/db.service";
import Link from "next/link";
import Image from "next/image";

import arrow from "@/images/right-arrow.svg";
import add from "@/images/add.svg";
import Switch from "@/components/Switch";
import UpdateBtn from "@/components/UpdateBtn";
import DeleteBtn from "@/components/DeleteBtn";
import { dancingScript } from "@/app/fonts/fonts";

interface BookPageProps {
	params: { id: string }; //params est un mot particulier de next qui permet de récupérer les queryparams, c'est pour ça que ça marche et pas la props id passée direct dans le component
}

const BookPage = async ({ params }: BookPageProps) => {
	const { id } = params;
	const currentBook = await getFullBook(parseInt(id));
	const arrayOfHearts: JSX.Element[] = [];

	function displayRating() {
		if (currentBook) {
			let count = 0;

			for (let i = 0; i < currentBook.rating; i++) {
				arrayOfHearts[i] = (
					<svg
						className="fill-[#A6596B] text-red-400 w-6 h-auto"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						key={count++}
					>
						<path
							d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
							style={{ stroke: "#311C0D", strokeWidth: 20 }}
						/>
					</svg>
				);
			}
			while (arrayOfHearts.length < 5) {
				arrayOfHearts.push(
					<svg
						className="fill-white text-red-400 w-6 h-auto"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						key={count++}
					>
						<path
							d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
							style={{ stroke: "#311C0D", strokeWidth: 20 }}
						/>
					</svg>
				);
			}
		}

		return arrayOfHearts;
	}

	return (
		<>
			{currentBook ? (
				<>
					<Link href="/bookshelf" className="flex gap-2 mr-[25ch] mt-4  ">
						<Image
							src={arrow}
							alt="arrow"
							width={20}
							height={20}
							className="rotate-180"
						/>{" "}
						Bibliothèque
					</Link>
					<section className="flex flex-col items-center mt-4 ">
						<h1 className={`${dancingScript.className} text-3xl font-bold`}>
							{currentBook.title}
						</h1>
						<section className="flex flex-col mt-6 w-[320px] ">
							<div className="flex justify-between ">
								<p>{currentBook.author.name}</p>
								<p>{currentBook.genre.name}</p>
							</div>
							{currentBook.serie ? (
								<div className="flex  justify-between mt-2 ">
									<p>{currentBook.serie}</p> <p>{currentBook.volume}</p>
								</div>
							) : null}
						</section>
						<section className="mt-8 flex gap-2"> {displayRating()}</section>
					</section>
					<section className="mt-8 bg-[#E4B781] bg-opacity-70 w-[320px] h-[200px] ml-4">
						{currentBook.resume}
					</section>
					<div className="flex justify-center mt-6">
						{" "}
						{currentBook.borrower !== "" || currentBook.returned === true ? (
							<p className=" text-[#E8410E]">Absent de la bibliothèque</p>
						) : null}
					</div>
					<section className=" flex flex-col items-start ml-4">
						<p className="mt-8">Format : papier</p>{" "}
						{currentBook.borrower && (
							<>
								<p className="mt-2">Emprunte par {currentBook.borrower} </p>
								{currentBook.date && (
									<p className="mt-2">
										Prêté le :{" "}
										{currentBook.date.toLocaleDateString("fr-FR", {
											day: "numeric",
											month: "numeric",
											year: "numeric",
										})}
									</p>
								)}
								<Switch currentBook={currentBook} />
							</>
						)}
					</section>
					<section className=" flex gap-2 absolute bottom-8 right-12">
						<div className="p-2 bg-[#E4B781] rounded-sm flex justify-center items-center">
							<UpdateBtn sizeIcon={16} id={currentBook.id} />
						</div>
						<div className="p-2 bg-[#E4B781] rounded-sm flex justify-center items-center">
							<DeleteBtn id={currentBook.id} sizeIcon={16} />
						</div>
						<Link
							href="/"
							className="bg-[#E4B781] p-2 rounded-sm flex justify-center items-center "
						>
							<Image src={add} alt="plus" width={18} height={18} />
						</Link>
					</section>
				</>
			) : (
				<p>Book not found</p>
			)}
		</>
	);
};

export default BookPage;
