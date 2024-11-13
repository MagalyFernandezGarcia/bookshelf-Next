import Image from "next/image";
import pen from "@/images/pen.svg";
const UpdateBtn = ({ sizeIcon }: { sizeIcon: number }) => {
	return (
		<button>
			<Image src={pen} alt="trash" width={sizeIcon} height={sizeIcon} />
		</button>
	);
};

export default UpdateBtn;
