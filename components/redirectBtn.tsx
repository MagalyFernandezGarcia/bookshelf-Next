import Link from "next/link";

const RedirectBtn = ({
	redirectLink,
	redirectTxt,
}: {
	redirectLink: string;
	redirectTxt: string;
}) => {
	return (
		<button className="bg-[#F8D8B1] p-2 rounded-lg text-[#794822]">
			<Link href={redirectLink}>{redirectTxt}</Link>
		</button>
	);
};

export default RedirectBtn;
