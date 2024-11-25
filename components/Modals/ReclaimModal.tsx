"use client";

import { setCookies } from "@/actions/modal.action";
import { updateReturn } from "@/app/db.service";

import { Book } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
	[id: string]: boolean;
};

const ReclaimModal = ({ array }: { array: Book[] }) => {
	const { register, handleSubmit, setValue, watch, getValues } =
		useForm<FormData>();

	const handleCheck: SubmitHandler<FormData> = (data) => {
		for (const key in data) {
			if (data[key]) {
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
			}
		}

		setCookies();
	};

	const checkAll = () => {
		const shouldCheckAllBoxes = () =>
			!Object.values(getValues()).every((value) => value);

		const shouldCheck = shouldCheckAllBoxes();

		array.forEach((book) => {
			setValue(book.id.toString(), shouldCheck);
		});
	};

	

	return (
		<div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-50 flex items-center justify-center ">
			<form
				onSubmit={handleSubmit(handleCheck)}
				className="bg-[#E4B781] p-16 rounded-lg flex flex-col gap-12  w-[90%] items-center  "
			>
				Il est temps de réclamer ces livres :
				<section>
					{array.map((book) => {
						return (
							<section className="flex items-start gap-4" key={book.id}>
								<label className="relative w-4 h-4 border-2 rounded-sm border-[#311C0D] bg-[#E4B781] flex justify-center mr-2 ">
									<input
										type="checkbox"
										{...register(book.id.toString())}
										className=" peer hidden "
									/>
									<span
										className={`w-2 h-2 bg-[#311C0D] absolute top-[2px]  ${
											!watch(book.id.toString()) && "hidden"
										}`}
									></span>
								</label>
								<div className="w-[80%]">
									<p className="italic font-bold">{book.title}</p>
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
						<button
							onClick={() => checkAll()}
							className="bg-[#F8D8B1] p-4 rounded-lg text-[##794822]"
							type="button"
						>
							Tout sélectionner
						</button>
						<button
							type="submit"
							className="bg-[#794822] p-4 rounded-lg text-[#F8D8B1]"
						>
							Fermer
						</button>
					</div>
				</section>
			</form>
		</div>
	);
};
export default ReclaimModal;
