import SearchBar from "@/components/SearchBar";
import Image from "next/image";

import ListOfBooks from "@/components/ListOfBooks";
import {
	byAuthor,
	byFormat,
	byGenre,
	getAuthors,
	getBooks,
	getFormats,
	getGenres,
	searchAuthor,
	searchBooks,
} from "../db.service";
import { Author, Book } from "@prisma/client";
import GeneralChoice from "@/components/GeneralChoice";
import Filter from "@/components/Filter";

import sitCat from "@/images/sitCat.png";
import ReclaimModal from "@/components/Modals/ReclaimModal";
import { cookies } from "next/headers";

const Page = async ({
	searchParams,
}: {
	searchParams: {
		filter: string;
		author?: string;
		genre?: string;
		format?: string;
		searchbar?: string;
	};
}) => {
	const filter = searchParams?.filter || "all";
	let currentArray: Book[] = [];
	let authors: Author[] = [];
	let searchArray: Book[] = [];
	const selectedAuthor = searchParams.author
		? parseInt(searchParams.author, 10)
		: undefined;
	const selectedGenre = searchParams.genre
		? parseInt(searchParams.genre, 10)
		: undefined;
	const selectedFormat = searchParams.format
		? parseInt(searchParams.format, 10)
		: undefined;
	const searchBarValue = searchParams.searchbar;

	const allBooks = await getBooks();

	switch (filter) {
		case "present":
			currentArray = allBooks.filter(
				(book) => book.borrower === "" && book.returned === false
			);
			break;
		case "absent":
			currentArray = allBooks.filter(
				(book) => book.borrower !== "" || book.returned === true
			);
			break;
		case "author":
			authors = await getAuthors();
			break;
		case "genre":
			authors = await getGenres();
			break;
		case "rating":
			currentArray = allBooks.sort((a: Book, b: Book) => b.rating - a.rating);
			break;
		case "format":
			authors = await getFormats();
			break;
		case "all":
			currentArray = allBooks;
			break;
		default:
			currentArray = allBooks;
	}

	if (selectedAuthor) {
		searchArray = selectedAuthor ? await byAuthor(selectedAuthor) : [];
	}
	if (selectedGenre) {
		searchArray = selectedGenre ? await byGenre(selectedGenre) : [];
	}
	if (selectedFormat) {
		searchArray = selectedFormat ? await byFormat(selectedFormat) : [];
	}
	if (searchBarValue) {
		currentArray = await searchBooks(searchBarValue);
		authors = await searchAuthor(searchBarValue);
	}

	const dateBorrow = allBooks.filter((book) => book.date);
	const reclaim = dateBorrow.filter((book) => {
		if (book.date) {
			const diffDate = new Date(book.date).getTime() - new Date().getTime();
			const diffInMonths = Math.floor(diffDate / (1000 * 60 * 60 * 24 * 30));
			return diffInMonths < -6;
		}
		return false;
	});
	const cookieStore = cookies();
	const modalDismissedAt = cookieStore.get("modalDismissedAt");
	const today = new Date().toDateString();
	const isModalDismissed =
		modalDismissedAt &&
		new Date(modalDismissedAt.value).toDateString() === today;

	if (reclaim.length !== 0) {
		return <ReclaimModal array={reclaim} />;
	}

	return (
		<>
			<SearchBar />
			<Filter />
			<div className="relative">
				<Image
					src={sitCat}
					alt="cat"
					width={80}
					height={80}
					className="absolute right-10  top-[-40px]"
				/>

				{searchBarValue ? (
					<>
						<ListOfBooks currentArray={currentArray} />
						<GeneralChoice valueChoice={authors} filter={filter} />
					</>
				) : selectedAuthor || selectedGenre || selectedFormat ? (
					<ListOfBooks currentArray={searchArray} />
				) : filter === "author" || filter === "genre" || filter === "format" ? (
					<GeneralChoice valueChoice={authors} filter={filter} />
				) : (
					<ListOfBooks currentArray={currentArray} />
				)}
			</div>
		</>
	);
};

export default Page;
