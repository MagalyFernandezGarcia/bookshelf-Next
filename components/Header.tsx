import Image from "next/image";
import logoChat from "@/images/logoChat.png";
import Link from "next/link";

const Header = ({ title = "Bookshelf" }: { title: string }) => {
	return (
		<header className="h-14 w-full bg-[#794822] flex justify-center items-center relative text-[#F8D8B1]">
			<Link href="/">
				<Image
					src={logoChat}
					alt="logo"
					width={40}
					height={40}
					className="absolute top-1 left-0"
				/>
			</Link>

			<h1 className="text-3xl">{title}</h1>
		</header>
	);
};

export default Header;
