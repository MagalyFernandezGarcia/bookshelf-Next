import Image from "next/image";
import logoChat from "@/images/logo.png";
import Link from "next/link";
import { dancingScript } from "@/app/fonts/fonts";
import { logout } from "@/actions/authenticate";
import { auth } from "@/auth";

const Header = async ({ title = "Bookshelf" }: { title: string }) => {
  const session = await auth();
 
  

  if (!session) {
    return (
      <header className="h-14 w-full bg-[#794822] flex justify-center items-center relative text-[#F8D8B1]">
        <Link href="/">
          <Image
            src={logoChat}
            alt="logo"
            height={100}
            className=" absolute top-[-20px] left-[-20px]"
          />
        </Link>

        <h1 className={`${dancingScript.className} text-4xl font-bold `}>
          {title}
        </h1>
      </header>
    );
  }
  return (
    <header className="h-14 w-full bg-[#794822] flex justify-around items-center relative text-[#F8D8B1]">
      <Link href="/">
        <Image
          src={logoChat}
          alt="logo"
          height={100}
          className=" absolute top-[-20px] left-[-20px]"
        />
      </Link>

      <h1 className={`${dancingScript.className} text-4xl font-bold ml-12`}>
        {title}
      </h1>
      <form action={logout}>
        <button
          type="submit"
          className="bg-[#794822] p-2 rounded-lg text-[#F8D8B1]"
        >
          log out
        </button>
      </form>
    </header>
  );
};

export default Header;
