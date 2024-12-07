"use server";
import { revalidatePath } from "next/cache";
import prisma from "./dbConfig/prisma";
import { BookSchema, CreateBook } from "./types/Book";
import { redirect } from "next/navigation";
import { NewUser } from "./types/User";
import { auth } from "@/auth";

export const getAuthors = async () => prisma.author.findMany();
export const getGenres = async () => prisma.genre.findMany();
export const getFormats = async () => prisma.format.findMany();
export const getSeries = async () => prisma.serie.findMany();

export async function getBooks() {
  const session = await auth();
  const userMail = session?.user?.email;

  if (!userMail) {
    throw new Error("Missing userId");
  }

  const user = await prisma.user.findUnique({
    where: { email: userMail },
  });
  const books = await prisma.book.findMany({
    where: {
      userId: user?.id,
    },
  });
  return books;
}

export async function createBook(data: CreateBook) {
  const { success, error, data: validatedBook } = BookSchema.safeParse(data);
  const session = await auth();
  const userMail = session?.user?.email;

  if (success) {
    const { author, genre, format,serie, ...bookData } = validatedBook;

    if (!userMail) {
      throw new Error("Missing userId");
    }

    const user = await prisma.user.findUnique({
      where: { email: userMail },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const foundAuthor = await prisma.author.upsert({
      where: { name: author },
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
    
    let foundSerie: { id: number } | null = null;
    if (serie) {
      foundSerie = await prisma.serie.upsert({
        where: { name: serie },
        update: {},
        create: { name: serie },
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
export const searchSerie = async (serachText: string) => {
  const serieFound = await prisma.serie.findMany({
    where: { name: { contains: serachText } },
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
  const { success, error, data: validatedBook } = BookSchema.safeParse(data);

  if (success) {
    const { author, genre, format,serie, ...bookData } = validatedBook;

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
    let foundSerie: { id: number } | null = null;
    if (serie) {
      foundSerie = await prisma.serie.upsert({
        where: { name: serie },
        update: {},
        create: { name: serie },
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
    // redirect(`/bookshelf/${id}`);
  } else {
    throw new Error("Validation error: " + JSON.stringify(error));
  }
}

export async function createUser(data: NewUser) {
  await prisma.user.create({ data });
}

export async function lendSerie(id: number, borrower: string, date: string) {
   const bookFromSerie =await prisma.book.findMany({where:{serieId:id}})
   bookFromSerie.forEach(async (book) => {
     await prisma.book.update({
       where: { id: book.id },
       data: {
         borrower,
         date,
       },
     });
   })
 

}