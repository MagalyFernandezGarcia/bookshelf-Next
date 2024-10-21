const InputStyle = ({labelTxt, placeholder}: {labelTxt: string, placeholder: string},)=>{

    return (<>
    <div className="flex flex-col mt-6">
      <label className="text-xs ps-16 " htmlFor={labelTxt} >{labelTxt}</label>
      <input className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-80 h-8 text-center" type="text" id={labelTxt} name="title" placeholder={placeholder}/>
      </div>
    </>)
}

export default InputStyle