import { BookData } from "../app/types/Book";

import { Dispatch, SetStateAction } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

const FormatChoice = ({
  register,
  error,
  currentDate,
  onSetValue,
  format,
  onSetFormat,
}: {
  register: UseFormRegister<BookData>;
  error: FieldErrors<BookData>;
  currentDate?: Date | null;
  onSetValue: UseFormSetValue<BookData>;
  format: string;
  onSetFormat: Dispatch<SetStateAction<string>>;
}) => {
  const changeFormat = (format: string) => {
    onSetFormat(format);
    onSetValue("format", format);
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
            onClick={() => changeFormat("kindle")}
            {...register("format")}
          />
          <span className=" relative w-4 h-4 border-2 border-[#311C0D] bg-[#E4B781] rounded-full flex justify-center mr-2 peer-checked:bg-[#E4B781] ">
            {format === "kindle" && (
              <span
                className={
                  format
                    ? "w-2 h-2 bg-[#311C0D] rounded-full absolute  top-[2px] "
                    : "w-2 h-2 bg-[#311C0D] rounded-full absolute right-[26px] top-[2px] "
                }
              ></span>
            )}
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
            onClick={() => changeFormat("paper")}
            {...register("format")}
          />
          <span className=" relative w-4 h-4 border-2 border-[#311C0D] bg-[#E4B781] rounded-full flex justify-center mr-2 peer-checked:bg-[#E4B781] ">
            {format === "paper" && (
              <span
                className={
                  format
                    ? "w-2 h-2 bg-[#311C0D] rounded-full absolute  top-[2px] "
                    : "w-2 h-2 bg-[#311C0D] rounded-full absolute right-[26px] top-[2px] "
                }
              ></span>
            )}
          </span>
          Papier
        </label>
      </div>
      {error?.format && (
        <p className="text-xs text-red-500">{error?.format.message}</p>
      )}
      <div className="flex mt-6 gap-5">
        <div className="flex flex-col">
          <label htmlFor="borrower" className="text-xs ps-8 ">
            Emprunteur
          </label>
          <input
            className={`bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-[150px] h-8 text-center ${
              format !== "paper" ? "opacity-60" : ""
            }`}
            type="text"
            id="borrower"
            placeholder="Jerem Aitrait"
            disabled={format !== "paper"}
            {...register("borrower")}
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="date" className="text-xs ps-8 ">
            Date
          </label>

          {!currentDate ? (
            <input
              className={`bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-[150px] h-8 text-center ${
                format !== "paper" ? "opacity-60" : ""
              }`}
              type="date"
              id="date"
              disabled={format !== "paper"}
              {...register("date")}
            />
          ) : (
            <input
              className={`bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-[150px] h-8 text-center ${
                format !== "paper" ? "opacity-60" : ""
              }`}
              type="date"
              id="date"
              disabled={format !== "paper"}
              {...register("date")}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FormatChoice;
