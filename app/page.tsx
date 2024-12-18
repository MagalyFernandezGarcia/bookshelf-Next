import { dancingScript } from "@/app/fonts/fonts";

import NavigateBtn from "@/components/Buttons/NavigateBtn";
import FormAdd from "@/components/FormAdd";


export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <NavigateBtn txt="Bibliothèque" location="right" href="/bookshelf" />
      <h1
        className={`text-3xl mt-4 ${dancingScript.className} font-bold lg:mb-4`}
      >
        Ajouter un livre
      </h1>
	  <FormAdd />
    </div>
  );
}
