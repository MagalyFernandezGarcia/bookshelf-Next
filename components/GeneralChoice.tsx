import { Author } from "@prisma/client";

const GeneralChoice = ({ valueChoice }: { valueChoice: Author[] }) => {
   

  return (
    <section className="flex flex-col gap-4 mt-8">
      {valueChoice.map((choice) => {
        return (
          <p
            key={choice.id}
            className="flex items-center justify-around  h-20 bg-[#E4B781] text-lg rounded-sm"
          >
            {choice.name}
          </p>
        );
      })}
    </section>
  );
};

export default GeneralChoice;
