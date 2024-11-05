import { BookData } from "@/app/page";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

const FormatChoice = ({
  register,
}: {
  register: UseFormRegister<BookData>;
}) => {
  const [paperFormat, setPaperFormat] = useState(false);
  const [kindleFormat, setKindleFormat] = useState(false);

  const handlePaperClick = () => {
    setPaperFormat(!paperFormat);
    setKindleFormat(false);
  };

  const handleKindleClick = () => {
    setKindleFormat(!kindleFormat);
    setPaperFormat(false);
  };
  return (
    <>
      <div className="flex  gap-4 mt-8">
        <label
          htmlFor="kindle"
          className="text-sm cursor-pointer flex items-center"
        >
          <input
            type="radio"
            id="kindle"
            value="kindle"
            className="hidden peer"
            onClick={handleKindleClick}
            {...register("format")}
          />
          <span className=" relative w-4 h-4 border-2 border-[#311C0D] bg-[#E4B781] rounded-full flex justify-center mr-2 peer-checked:bg-[#E4B781] ">
            {kindleFormat ? (
              <span className="w-2 h-2 bg-[#311C0D] rounded-full absolute right-[34px] top-[2px] "></span>
            ) : null}
          </span>
          Kindle
        </label>

        <label
          htmlFor="paper"
          className="text-sm cursor-pointer flex items-center"
        >
          <input
            type="radio"
            id="paper"
            value="paper"
            className="hidden peer"
            onClick={handlePaperClick}
            {...register("format")}
          />
          <span className=" relative w-4 h-4 border-2 border-[#311C0D] bg-[#E4B781] rounded-full flex justify-center mr-2 peer-checked:bg-[#E4B781] ">
            {paperFormat ? (
              <span className="w-2 h-2 bg-[#311C0D] rounded-full absolute right-[34px] top-[2px] "></span>
            ) : null}
          </span>
          Papier
        </label>
      </div>
      <div className="flex mt-6 gap-5">
        <div className="flex flex-col">
          <label htmlFor="borrower" className="text-xs ps-8 ">
            Emprunteur
          </label>
          <input
            className={`bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-[150px] h-8 text-center ${
              !paperFormat ? "opacity-60" : ""
            }`}
            type="text"
            id="borrower"
            placeholder="Jerem Aitrait"
            disabled={!paperFormat}
            {...register("borrower")}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="date" className="text-xs ps-8 ">
            Date
          </label>
          <input
            className={`bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-[150px] h-8 text-center ${
              !paperFormat ? "opacity-60" : ""
            }`}
            type="text"
            id="date"
            placeholder="05/11/2024"
            disabled={!paperFormat}
            {...register("date")}
          />
        </div>
      </div>
    </>
  );
};

export default FormatChoice;
