"use client"

import { searchBooks } from "@/app/db.service";
import { FieldValues, SubmitHandler, useForm, UseFormHandleSubmit } from "react-hook-form";



const SearchBar = () => {
    const { handleSubmit, register} = useForm<{search: string}>();

    const search: SubmitHandler<{search: string}> = async (data) => {
       const array = await searchBooks(data.search)
       console.log(array);
       
        
    }

    return (<form onSubmit={handleSubmit(search)} className=" flex flex-col  place-content-center relative">
        <input
            type="text"
            placeholder="Rechercher"
            className="bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-80 h-8 text-center rounded-2xl mt-6"
            {...register("search")}
        />
        <button type="submit" className="bg-[#794822] p-2 rounded-lg text-[#F8D8B1] mt-6">Rechercher</button>
    </form>)
    
}

export default SearchBar