"use client";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import InputStyle from "@/components/InputStyle";
import HeartVote from "@/components/HeartVote";
import Switch from "@/components/Switch";
import FormatChoice from "@/components/FormatChoice";

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
					<FormatChoice/>
				
			</form>
		</>
	);
}
