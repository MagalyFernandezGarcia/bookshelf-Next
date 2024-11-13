"use server";
import { revalidatePath } from "next/cache";
import prisma from "./dbConfig/prisma";
import { BookSchema, CreateBook } from "./types/Book";

export const getBooks = async () => prisma.book.findMany();
export const getAuthors = async () => prisma.author.findMany();
export const getGenres = async () => prisma.genre.findMany();

export async function createBook(data: CreateBook) {
	const { success, error, data: validatedBook } = BookSchema.safeParse(data);

	if (success) {
		const { author, genre, ...bookData } = validatedBook;

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

		await prisma.book.create({
			data: {
				...bookData,
				authorId: foundAuthor.id,
				genreId: foundGenre.id,
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
