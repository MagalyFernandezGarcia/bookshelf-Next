import Image from "next/image";
import pen from "@/images/pen.svg";
import Link from "next/link";
const UpdateBtn = ({ sizeIcon, id }: { sizeIcon: number; id: number }) => {
	return (
		<button>
			<Link href={`/bookshelf/${id}/update`}>
				<Image src={pen} alt="pen" width={sizeIcon} height={sizeIcon} className="lg:w-full lg:h-auto"/>
			</Link>
		</button>
	);
};

export default UpdateBtn;
