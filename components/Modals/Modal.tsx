import Link from "next/link";
import { useState } from "react";
import Spinner from "../Spinner";

const Modal = ({
	modalContent,
	onSetModal,
}: {
	modalContent: string;
	onSetModal: () => void;
}) => {
	const[loaded, setLoaded] = useState(false);
	return (
		<div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-50 flex items-center justify-center ">
			<div className="bg-[#E4B781] p-16 rounded-lg flex flex-col gap-12  w-[90%] items-center lg:w-[600px] ]">
				{modalContent}
				<div className="flex gap-4  ">
					<button
						onClick={onSetModal}
						className="bg-[#794822] p-2 rounded-lg text-[#F8D8B1] cursor-pointer hover:bg-[#b66f38]"
					>
						Ajouter un livre
					</button>
					<button onClick={()=>setLoaded(true)} className="bg-[#F8D8B1] p-2 rounded-lg text-[#794822] cursor-pointer hover:bg-[#ecd3b4] min-w-[110px]" >
						
						{loaded ?<Spinner size={40}/> : <Link href="/bookshelf">Bibliothèque</Link>}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
