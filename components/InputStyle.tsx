import { BookData } from "@/app/page"
import { UseFormRegister } from "react-hook-form"

const InputStyle = ({labelTxt, placeholder, register, registerName}: {labelTxt: string, placeholder: string, register: UseFormRegister<BookData>, registerName:  keyof BookData})=>{

    return (<>
    <div className="flex flex-col mt-6">
      <label className="text-xs ps-16 " htmlFor={labelTxt} >{labelTxt}</label>
      <input className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-80 h-8 text-center" type="text" id={labelTxt}  placeholder={placeholder} {...register(registerName)}/>
      </div>
    </>)
}

export default InputStyle