import { BookData } from "../app/types/Book";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const InputStyle = ({
  labelTxt,
  placeholder,
  register,
  registerName,
  error
}: {
  labelTxt: string;
  placeholder: string;
  register: UseFormRegister<BookData>;
  registerName: keyof BookData;
  error?: FieldErrors<BookData>
}) => {
  const errorMessage = error?.[registerName]
  return (
    <>
      <div className="flex flex-col mt-6">
        <label className="text-xs ps-16 " htmlFor={labelTxt}>
          {labelTxt}
        </label>
        <input
          className=" bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-80 h-8 text-center rounded-md"
          type="text"
          id={labelTxt}
          placeholder={placeholder}
          {...register(registerName)}
          
        />
        {errorMessage && <p className="text-xs text-red-500">{errorMessage.message}</p>}
      </div>
    </>
  );
  
};

export default InputStyle;
