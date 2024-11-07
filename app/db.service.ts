"use server"
import prisma from "./dbConfig/prisma";
import { BookSchema } from "./types/Book";


export const getBooks = async () => prisma.book.findMany();

export async function createBook(data: any) {
    const { success, error, data: validatedBook } = BookSchema.safeParse(data);

    if (success) {
        return await prisma.book.create({
            data: validatedBook,
        });
    } else {
        throw new Error("Validation error: " + JSON.stringify(error));
    }
}

export const deleteBook = async (id: number) => {
    return await prisma.book.delete({
        where: {
            id,
        },
    });
}