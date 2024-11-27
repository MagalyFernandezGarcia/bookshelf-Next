"use client";
import Image from "next/image";
import pen from "@/images/pen.svg";
import Link from "next/link";
import { useState } from "react";
import Spinner from "../Spinner";
const UpdateBtn = ({ sizeIcon, id }: { sizeIcon: number; id: number }) => {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<button className="hover:scale-150" onClick={()=>setIsLoading(true)}>
			{isLoading? <Spinner size={sizeIcon}/> : <Link href={`/bookshelf/${id}/update`}>
				<Image src={pen} alt="pen" width={sizeIcon} height={sizeIcon} className="lg:w-full lg:h-auto"/>
			</Link>}
			
		</button>
	);
};

export default UpdateBtn;
