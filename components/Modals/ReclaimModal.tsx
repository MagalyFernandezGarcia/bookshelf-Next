"use client";

import { updateReturn } from "@/app/db.service";

import { Book } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
	[id: string]: boolean;
};

const ReclaimModal = ({ array }: { array: Book[] }) => {
	const router = useRouter();

	const { register, handleSubmit, setValue } = useForm<FormData>();

	const handleCheck: SubmitHandler<FormData> = (data) => {
		for (const key in data) {
			if (data[key] === true) {
				try {
					updateReturn(parseInt(key))
						.then(() => {
							console.log("Update successful!");
						})
						.catch((error) => {
							console.error("Update failed:", error);
						});
				} catch (error) {
					console.error("Caught error:", error);
				}
			} else {
				document.cookie = `modalDismissedAt=${new Date().toISOString()}; path=/;`;
			}
		}
		router.push(`/bookshelf`);
	};

	const checkAll = (isChecked: boolean) => {
		array.forEach((book) => {
			setValue(book.id.toString(), isChecked);
		});
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-50 flex items-center justify-center ">
			<form
				onSubmit={handleSubmit(handleCheck)}
				className="bg-white p-16 rounded-lg flex flex-col gap-12  w-[90%] items-center "
			>
				Il est temps de réclamer ces livres :
				<section>
					{array.map((book) => {
						return (
							<section className="flex items-start gap-4" key={book.id}>
								<input type="checkbox" {...register(book.id.toString())} />
								<div>
									<p>{book.title}</p>
									<div>
										<p>
											Prêté à: {book.borrower} le{" "}
											{book.date?.toLocaleDateString("fr-FR", {
												day: "numeric",
												month: "numeric",
												year: "numeric",
											})}
										</p>
									</div>
								</div>
							</section>
						);
					})}
					<div className="mt-24 flex gap-4">
						<input
							type="checkBox"
							name="checkAll"
							onClick={(e) => checkAll((e.target as HTMLInputElement).checked)}
						/>
						<label htmlFor="checkAll">Tout sélectionner</label>
					</div>
				</section>
				<div className="flex gap-4  ">
					<button
						type="submit"
						className="bg-[#794822] p-4 rounded-lg text-[#F8D8B1]"
					>
						Fermer
					</button>
				</div>
			</form>
		</div>
	);
};
export default ReclaimModal;
