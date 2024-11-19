"use client";

import { Book } from "@prisma/client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const ReclaimModal = ({ array }: { array: Book[] }) => {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathName = usePathname();

	return (
		<div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-50 flex items-center justify-center ">
			<div className="bg-white p-16 rounded-lg flex flex-col gap-12  w-[90%] items-center ">
				Il est temps de réclamer ces livres :
				<section>
					{array.map((book) => {
						return (
							<section className="flex items-start gap-4">
								<input type="checkbox" />
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
				</section>
				<div className="flex gap-4  ">
					<button className="bg-[#794822] p-4 rounded-lg text-[#F8D8B1]">
						Fermer
					</button>
				</div>
			</div>
		</div>
	);
};
export default ReclaimModal;
