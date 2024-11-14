import Image from "next/image";
import logoChat from "@/images/logoChat.png";
import Link from "next/link";
import { dancingScript} from "@/app/fonts/fonts";

const Header = ({ title = "Bookshelf" }: { title: string }) => {
	return (
		<header className="h-14 w-full bg-[#794822] flex justify-center items-center relative text-[#F8D8B1]">
			<Link href="/">
				<Image
					src={logoChat}
					alt="logo"
					height={56}
					
					className="absolute top-0 left-0"
				/>
			</Link>

			<h1 className={`${dancingScript.className} text-4xl font-bold`}>{title}</h1>
		</header>
	);
};

export default Header;
