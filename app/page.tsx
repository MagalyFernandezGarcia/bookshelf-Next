"use client";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import InputStyle from "@/components/InputStyle";
import HeartVote from "@/components/HeartVote";
import Switch from "@/components/Switch";
import FormatChoice from "@/components/FormatChoice";
import Image from 'next/image'
import check from './images/check-solid.svg'
import eraser from './images/eraser-solid.svg'

export default function Home() {
  return (
    <>
      <h1>Ajouter un livre</h1>
      <form className="place-content-center }">
        <InputStyle labelTxt="Titre" placeholder="Titre d'un chouette livre" />
        <InputStyle labelTxt="Volume" placeholder="1" />
        <InputStyle labelTxt="Série" placeholder="Une super série" />
        <InputStyle labelTxt="Auteur" placeholder="Yvan Dailivre" />
        <InputStyle labelTxt="Genre" placeholder="Fantasy" />
        <div className="flex flex-col mt-6">
          <label className="text-xs ps-16 " htmlFor="resume">
            Résumé
          </label>
          <textarea
            className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-80 overflow-x-auto text-sm"
            rows={7}
            name="resume"
            id="resume"
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum provident commodi in perspiciatis. Error laudantium ut minus architecto corrupti aut illum reiciendis velit, perferendis officia vero vel fuga nemo atque."
          ></textarea>
        </div>
        <HeartVote />
        <Switch />
        <FormatChoice />
		<div className="flex  mt-6 gap-2">
			<button type="reset" className="w-40 h-24 bg-[#E8CAA7] flex items-center justify-center mb-6"> <Image src={eraser} width={40} height={40} alt="eraser"  /></button>
			<button type="submit" className="w-[150px] h-24 bg-[#794822] flex items-center justify-center mb-6"><Image src={check} width={40} height={40} alt="check" className="color-green"/> </button>
			
		</div>
      </form>
    </>
  );
}
