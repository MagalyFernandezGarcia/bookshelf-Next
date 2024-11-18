"use server";
import { revalidatePath } from "next/cache";
import prisma from "./dbConfig/prisma";
import { BookSchema, CreateBook } from "./types/Book";
import { redirect } from "next/navigation";

export const getBooks = async () => prisma.book.findMany();
export const getAuthors = async () => prisma.author.findMany();
export const getGenres = async () => prisma.genre.findMany();
export const getFormats = async () => prisma.format.findMany();

export async function createBook(data: CreateBook) {
	const { success, error, data: validatedBook } = BookSchema.safeParse(data);

	if (success) {
		const { author, genre, format, ...bookData } = validatedBook;

		const foundAuthor = await prisma.author.upsert({
			where: {
				name: author,
			},
			update: {},
			create: { name: author },
		});

		const foundGenre = await prisma.genre.upsert({
			where: { name: genre },
			update: {},
			create: { name: genre },
		});
		const foundFormat = await prisma.format.upsert({
			where: { name: format },
			update: {},
			create: { name: format },
		});

		await prisma.book.create({
			data: {
				...bookData,
				authorId: foundAuthor.id,
				genreId: foundGenre.id,
				formatId: foundFormat.id,
			},
		});
	} else {
		throw new Error("Validation error: " + JSON.stringify(error));
	}
}

export const deleteBook = async (id: number) => {
	await prisma.book.delete({
		where: {
			id,
		},
	});

	revalidatePath("/bookshelf");
};

export const searchBooks = async (serachText: string) => {
	const booksFound = await prisma.book.findMany({
		where: { title: { contains: serachText } },
	});
	return booksFound;
};

export const searchAuthor = async (serachText: string) => {
	const AuthorsFound = await prisma.author.findMany({
		where: { name: { contains: serachText } },
	});
	return AuthorsFound;
};

export const byAuthor = async (id: number) => {
	const authorSelected = await prisma.book.findMany({
		where: { authorId: id },
	});
	return authorSelected;
};

export const byGenre = async (id: number) => {
	const genreSelected = await prisma.book.findMany({ where: { genreId: id } });
	return genreSelected;
};

export const byFormat = async (id: number) => {
	const formatSelected = await prisma.book.findMany({
		where: { formatId: id },
	});
	return formatSelected;
};

export const getFullBook = async (id: number) => {
	const fullBook = await prisma.book.findUnique({
		where: { id },
		include: {
			author: { select: { name: true } },
			genre: { select: { name: true } },
			format: { select: { name: true } },
		},
	});
	return fullBook;
};

export const updateReturn = async (id: number) =>
	prisma.book.update({
		where: {
			id,
		},
		data: {
			borrower: "",
			date: null,
		},
	});

export async function updateBook(data: CreateBook, id: number) {
	const { success, error, data: validatedBook } = BookSchema.safeParse(data);

	if (success) {
		const { author, genre, format, ...bookData } = validatedBook;

		const foundAuthor = await prisma.author.upsert({
			where: {
				name: author,
			},
			update: {},
			create: { name: author },
		});

		const foundGenre = await prisma.genre.upsert({
			where: { name: genre },
			update: {},
			create: { name: genre },
		});
		const foundFormat = await prisma.format.upsert({
			where: { name: format },
			update: {},
			create: { name: format },
		});

		await prisma.book.update({
			where: { id },
			data: {
				...bookData,
				authorId: foundAuthor.id,
				genreId: foundGenre.id,
				formatId: foundFormat.id,
			},
		});
		redirect(`/bookshelf/${id}`);
	} else {
		throw new Error("Validation error: " + JSON.stringify(error));
	}
}
