"use server";

import prisma from "@/app/dbConfig/prisma";
import { revalidatePath } from "next/cache";

export async function fetchSeries(
	id: number,
	borrower: string,
	date: string,
	lend: boolean
) {
	const bookFromSerie = await prisma.book.findMany({ where: { serieId: id } });

	bookFromSerie.forEach(async (book) => {
		await prisma.book.update({
			where: { id: book.id },
			data: {
				borrower,
				date: date === "" ? null : date,
			},
		});
		await prisma.serie.update({
			where: { id: id },
			data: {
				lend,
			},
		});
	});
	revalidatePath("/bookshelf?sort=serie");
	return await prisma.serie.findMany();
}
