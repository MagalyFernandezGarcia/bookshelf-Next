import Image from "next/image";
import logoChat from "@/images/logo.png";
import Link from "next/link";
import { dancingScript } from "@/app/fonts/fonts";

const Header = ({ title = "Bookshelf" }: { title: string }) => {
	return (
		<header className="h-14 w-full bg-[#794822] flex justify-center items-center relative text-[#F8D8B1]">
			<Link href="/">
				<Image
					src={logoChat}
					alt="logo"
					height={100}
					className="absolute top-[-20px] left-[-20px]"
				/>
			</Link>

			<h1 className={`${dancingScript.className} text-4xl font-bold`}>
				{title}
			</h1>
		</header>
	);
};

export default Header;
