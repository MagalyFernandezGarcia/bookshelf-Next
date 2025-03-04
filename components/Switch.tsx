"use client";

import { BookData } from "@/app/types/Book";
import { UseFormRegister } from "react-hook-form";
import { Book } from "@prisma/client";
import { updateReturn } from "@/app/db.service";
import { useRouter } from "next/navigation";
import { Serie } from "@/app/types/Serie";

const Switch = ({
  register,
  currentBook,
  serie,
  onSwitch,
}: {
  register?: UseFormRegister<BookData>;
  currentBook?: Book;
  serie?: Serie;
  onSwitch?: () => void;
}) => {
  const router = useRouter();

  function update() {
    if (currentBook) {
      updateReturn(currentBook.id);

      router.push(`/bookshelf/${currentBook.id}`);
    }
  }

  return (
    <div className="flex flex-col mt-6">
      <label className="relative inline-block w-12 h-6 text-xs cursor-pointer">
        <span className="absolute left-[12px]">
          {serie ? "Prêté" : "Retour"}
        </span>
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={serie ? !!serie.isLent : undefined}
          {...(register ? register("returned") : {})}
          onChange={currentBook ? update : serie ? onSwitch : undefined}
        />

        <span className="slider block w-full h-full bg-[#D8778D] transition-all duration-300 rounded-full relative">
          <span className="absolute bottom-1 left-1 h-4 w-4 bg-white transition-transform duration-300 rounded-full"></span>
        </span>

        <style>
          {`
            input:checked + span {
              background-color: #0FA958; 
            }
            
            input:focus + span {
              box-shadow: 0 0 1px #0FA958; 
            }
            
            input:checked + span span {
              transform: translateX(1.5rem); 
            }
          `}
        </style>
      </label>
    </div>
  );
};

export default Switch;
