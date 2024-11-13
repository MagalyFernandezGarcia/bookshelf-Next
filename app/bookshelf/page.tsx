import SearchBar from "@/components/SearchBar";

import ListOfBooks from "@/components/ListOfBooks";
import {
	byAuthor,
	byGenre,
	getAuthors,
	getBooks,
	getGenres,
} from "../db.service";
import { Author, Book } from "@prisma/client";
import GeneralChoice from "@/components/GeneralChoice";

import Filter from "@/components/Filter";

const Page = async ({
	searchParams,
}: {
	searchParams: { filter: string; author?: string; genre?: string };
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

		default:
			currentArray = allBooks;
	}

	if (selectedAuthor) {
		searchArray = selectedAuthor ? await byAuthor(selectedAuthor) : [];
	}
	if (selectedGenre && filter === "genre") {
		searchArray = selectedGenre ? await byGenre(selectedGenre) : [];
	}

	return (
		<>
			<SearchBar />
			<Filter />

			{selectedAuthor || selectedGenre ? (
				<ListOfBooks currentArray={searchArray} />
			) : filter === "author" || filter === "genre" ? (
				<GeneralChoice valueChoice={authors} filter={filter} />
			) : (
				<ListOfBooks currentArray={currentArray} />
			)}
		</>
	);
};

export default Page;
