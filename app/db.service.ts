"use server";
import { revalidatePath } from "next/cache";
import prisma from "./dbConfig/prisma";
import { BookSchema, CreateBook } from "./types/Book";


export const getBooks = async () => prisma.book.findMany();

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
