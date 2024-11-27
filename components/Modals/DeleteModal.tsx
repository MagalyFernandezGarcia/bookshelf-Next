import Image from "next/image";
import check from "@/images/check-solid.svg";
import del from "@/images/delete.svg";

const DeleteModal = ({
	onSetModal,
	onAbort,
}: {
	onSetModal: () => void;
	onAbort: () => void;
}) => {
	return (
		<div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-50 flex items-center justify-center ">
			<div className="bg-[#E4B781] p-16 rounded-lg flex flex-col gap-12  w-[90%] items-center ">
				Etes vous sûr de vouloir supprimer ce livre?
				<div className="flex gap-4  ">
					<button onClick={onSetModal} className="bg-[#794822] p-4 rounded-lg hover:bg-[#b66f38]">
						<Image src={check} alt="ok" height={40} />
					</button>
					<button onClick={onAbort} className="bg-[#F8D8B1] p-4 rounded-lg hover:bg-[#ecd3b4]">
						<Image src={del} alt="croix" height={40} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
