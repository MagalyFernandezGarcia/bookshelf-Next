import Link from "next/link";

const Modal = ({
	modalContent,
	onSetModal,
}: {
	modalContent: string;
	onSetModal: () => void;
}) => {
	return (
		<div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-50 flex items-center justify-center ">
			<div className="bg-[#E4B781] p-16 rounded-lg flex flex-col gap-12  w-[90%] items-center lg:w-[600px] ">
				{modalContent}
				<div className="flex gap-4  ">
					<button
						onClick={onSetModal}
						className="bg-[#794822] p-2 rounded-lg text-[#F8D8B1]"
					>
						Ajouter un livre
					</button>
					<button className="bg-[#F8D8B1] p-2 rounded-lg text-[#794822]">
						<Link href="/bookshelf">Bibliothèque</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
