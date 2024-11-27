"use client"

import Link from "next/link"

import Image from "next/image";
import arrow from "@/images/right-arrow.svg";
import { useState } from "react";
import Spinner from "../Spinner";

const NavigateBtn = ({location, txt, href} : {location: string, txt: string, href: string}) => {
    const [isLoading, setIsLoading] = useState(false)

    
    return (
        <button className=" mr-[-200px] mt-4 lg:mr-[-600px]" onClick={()=>setIsLoading(true)}>
            {isLoading ? <Spinner size={20}/> : location === "right"?<Link href={href} className="flex gap-2  mt-4  ">
				{txt} <Image src={arrow} alt="arrow" width={20} height={20} />
			</Link>:<Link href={href} className="flex gap-2  mt-4  ">
            <Image src={arrow} alt="arrow" width={20} height={20} className="rotate-180" />{txt}
			</Link>}
			
			</button>
    )
    
    
}

export default NavigateBtn