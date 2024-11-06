
import prisma from "./dbConfig/prisma";


export const test = async () => prisma.book.findMany();