"use client"

import Link from "next/link"

import Image from "next/image";
import arrow from "@/images/right-arrow.svg";
import { useState } from "react";
import Spinner from "../Spinner";
import { useSearchParams } from "next/navigation";

const NavigateBtn = ({location, txt, href, retainQueryParams} : {location: string, txt: string, href: string, retainQueryParams?: boolean}) => {
    
    
    const [isLoading, setIsLoading] = useState(false)
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams)
    console.log("retour", params.toString());
    
   
  
    const queryParams = retainQueryParams  ? params.toString() : "";

   
    const updatedHref = queryParams ? `${href}?${queryParams}` : href;
  
    
    

    
    return (
        <button className=" mr-[-200px] mt-4 lg:mr-[-600px]" onClick={()=>setIsLoading(true)}>
            {isLoading ? <Spinner size={20}/> : location === "right"?<Link href={updatedHref} className="flex gap-2  mt-4  ">
				{txt} <Image src={arrow} alt="arrow" width={20} height={20} />
			</Link>:<Link href={updatedHref} className="flex gap-2  mt-4  ">
            <Image src={arrow} alt="arrow" width={20} height={20} className="rotate-180" />{txt}
			</Link>}
			
			</button>
    )
    
    
}

export default NavigateBtn