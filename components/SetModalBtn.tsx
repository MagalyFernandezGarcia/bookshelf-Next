const SetModalBtn = ({
	onSetModal,
	txtBtn,
}: {
	onSetModal: () => void;
	txtBtn: string;
}) => {
	return (
		<button
			onClick={onSetModal}
			className="bg-[#794822] p-2 rounded-lg text-[#F8D8B1]"
		>
			{txtBtn}
		</button>
	);
};

export default SetModalBtn;
