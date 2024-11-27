const ConfirmModal = ({ onSetModal }: { onSetModal: () => void }) => {
	return (
		<div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-50 flex items-center justify-center ">
			<div className="bg-[#E4B781] p-16 rounded-lg flex flex-col gap-12  w-[90%] items-center lg:w-[600px]">
				Le livre a bien été modifié
				<div className="flex gap-4  ">
					<button
						onClick={onSetModal}
						className="bg-[#794822] p-4 rounded-lg text-[#F8D8B1] hover:bg-[#b66f38]"
					>
						Fermer
					</button>
				</div>
			</div>
		</div>
	);
};
export default ConfirmModal;
