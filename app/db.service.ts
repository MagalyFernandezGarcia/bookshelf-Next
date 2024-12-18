"use server";
import { revalidatePath } from "next/cache";
import prisma from "./dbConfig/prisma";
import { BookSchema, CreateBook } from "./types/Book";
import { NewUser } from "./types/User";
import { auth } from "@/auth";

const foundUser = async () => {
  const session = await auth();
  const userMail = session?.user?.email;

  if (!userMail) {
    throw new Error("Missing userId");
  }

  const user = await prisma.user.findUnique({
    where: { email: userMail },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const getFormats = async () => prisma.format.findMany();

export async function getBooks() {
  const user = await foundUser();
  const books = await prisma.book.findMany({
    where: {
      userId: user.id,
    },
  });
  return books;
}

export async function getAuthors() {
  const user = await foundUser();

  const authors = await prisma.author.findMany({
    where: {
      userId: user.id,
    },
  });
  return authors;
}
export async function getGenres() {
  const user = await foundUser();

  const genres = await prisma.genre.findMany({
    where: {
      userId: user.id,
    },
  });
  return genres;
}

export async function getSeries() {
	const user = await foundUser();
  
	const series = await prisma.serie.findMany({
	  where: {
		userId: user?.id,
	  },
	  include: {
		books: {
		  where: {
			borrower: "", // Only include books with an empty borrower
		  },
		},
	  },
	  orderBy: { name: "asc" },
	});
  
	
	const isLent = series.map((serie) => ({
	  ...serie,
	  isLent: serie.books.length === 0, 
	}));
  
	return isLent;
  }
  

export async function createBook(data: CreateBook) {
  const user = await foundUser();
  const validatedBook = BookSchema.parse(data);

  const { author, genre, format, serie, ...bookData } = validatedBook;

  const foundAuthor = await prisma.author.upsert({
    where: { name: author },
    update: {},
    create: { name: author, userId: user.id },
  });

  const foundGenre = await prisma.genre.upsert({
    where: { name: genre },
    update: {},
    create: { name: genre, userId: user.id },
  });

  const foundFormat = await prisma.format.upsert({
    where: { name: format },
    update: {},
    create: { name: format },
  });

  let foundSerie: { id: number } | null = null;
  if (serie) {
    foundSerie = await prisma.serie.upsert({
      where: { name: serie },
      update: {},
      create: { name: serie, userId: user.id },
    });
  }

  await prisma.book.create({
    data: {
      ...bookData,
      authorId: foundAuthor.id,
      genreId: foundGenre.id,
      formatId: foundFormat.id,
      userId: user.id,
      serieId: foundSerie?.id || null,
    },
  });
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
  const user = await foundUser();
  const booksFound = await prisma.book.findMany({
    where: { title: { contains: serachText }, userId: user.id },
  });
  return booksFound;
};

export const searchAuthor = async (serachText: string) => {
  const user = await foundUser();
  const AuthorsFound = await prisma.author.findMany({
    where: { name: { contains: serachText }, userId: user.id },
  });
  return AuthorsFound;
};
export const searchSerie = async (serachText: string) => {
  const user = await foundUser();
  const serieFound = await prisma.serie.findMany({
    where: { name: { contains: serachText }, userId: user.id },
  });
  return serieFound;
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

export const bySerie = async (id: number) => {
  const serieSelected = await prisma.book.findMany({ where: { serieId: id } });
  return serieSelected;
};

export const getFullBook = async (id: number) => {
  const fullBook = await prisma.book.findUnique({
    where: { id },
    include: {
      author: { select: { name: true } },
      genre: { select: { name: true } },
      format: { select: { name: true } },
      serie: { select: { name: true } },
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
  const user = await foundUser();
  const validatedBook = BookSchema.parse(data);

  const { author, genre, format, serie, ...bookData } = validatedBook;

  const foundAuthor = await prisma.author.upsert({
    where: {
      name: author,
    },
    update: {},
    create: { name: author, userId: user.id },
  });

  const foundGenre = await prisma.genre.upsert({
    where: { name: genre },
    update: {},
    create: { name: genre, userId: user.id },
  });
  const foundFormat = await prisma.format.upsert({
    where: { name: format },
    update: {},
    create: { name: format },
  });
  let foundSerie: { id: number } | null = null;
  if (serie) {
    foundSerie = await prisma.serie.upsert({
      where: { name: serie },
      update: {},
      create: { name: serie, userId: user.id },
    });
  }

  await prisma.book.update({
    where: { id },
    data: {
      ...bookData,
      authorId: foundAuthor.id,
      genreId: foundGenre.id,
      formatId: foundFormat.id,
      serieId: foundSerie?.id || null,
    },
  });
}

export async function createUser(data: NewUser) {
  await prisma.user.create({ data });
}

export async function lendSerie(
  id: number,
  borrower: string,
  date: string,
  
) {
  const user = await foundUser();
  const bookFromSerie = await prisma.book.findMany({ where: { serieId: id } });

  for (const book of bookFromSerie) {
    await prisma.book.update({
      where: { id: book.id, userId: user.id },
      data: {
        borrower,
        date: date === "" ? null : date,
      },
    });
    
  }
  revalidatePath("/bookshelf");
}
