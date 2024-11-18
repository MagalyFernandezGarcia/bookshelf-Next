import Link from "next/link";
import SetModalBtn from "./SetModalBtn";
import RedirectBtn from "./redirectBtn";

const Modal = ({
	modalContent,
	onSetModal,
	returnBtn,
	redirectBtn,
	redirectLink,
	onSelection,
	txtSelection,
}: {
	modalContent: string;
	onSetModal: () => void;
	returnBtn: string;
	redirectBtn?: string;
	redirectLink?: string;
	onSelection?: () => void;
	txtSelection?: string;
}) => {
	return (
		<div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-50 z-50 flex items-center justify-center ">
			<div className="bg-white p-16 rounded-lg flex flex-col gap-12  w-[90%] items-center ">
				{modalContent}
				<div className="flex gap-4  ">
					<SetModalBtn onSetModal={onSetModal} txtBtn={returnBtn} />
					{redirectBtn && redirectLink && (
						<RedirectBtn
							redirectLink={redirectLink}
							redirectTxt={redirectBtn}
						/>
					)}
					{onSelection && txtSelection && (
						<SetModalBtn onSetModal={onSelection} txtBtn={txtSelection} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Modal;
