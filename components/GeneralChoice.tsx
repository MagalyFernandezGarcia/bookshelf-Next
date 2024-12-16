"use client";

import { Author, Format, Serie } from "@prisma/client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import Spinner from "./Spinner";
import Switch from "./Switch";
import { lendSerie } from "@/app/db.service";

import SerieModal from "./Modals/SerieModal";
import sitCat from "@/images/sitCat.png";
import Image from "next/image";
import Link from "next/link";
const GeneralChoice = ({
  valueChoice,
  sort,
  formats,
  series,
}: {
  valueChoice?: Author[];
  formats?: Format[];
  sort: string;
  series?: Serie[];
}) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();

  const handleClick = (id: number) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams);
    if (params.has("searchbar")) {
      params.delete("searchbar");
      params.set("author", id.toString());
    }

    if (id) {
      params.set(sort, id.toString());
    } else {
      params.delete(sort);
    }

    replace(`${pathName}?${params.toString()}`);
  };

  const handleSwitch = (serie: Serie) => {
    if (serie.lend === true) {
      try {
        lendSerie(serie.id, "", "", false);
        console.log("lendSerie called to set lend to false for:", serie.id);
        console.log("Modal should not appear, modal state:", modal);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("lend is false, setting modal:", serie.id);
      setModal(serie.id);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(0);

  if (valueChoice) {
    return (
      <>
        {isLoading ? (
          <Spinner size={40} />
        ) : (
          <section className="flex flex-col gap-4 mt-8">
            <Image
              src={sitCat}
              alt="cat"
              width={80}
              height={80}
              className="absolute right-10  top-[-40px] lg:right-20"
            />
            {valueChoice.map((choice) => {
              return (
                <p
                  key={choice.id}
                  onClick={() => handleClick(choice.id)}
                  className="flex items-center justify-around  h-20 bg-[#E4B781] text-lg rounded-sm"
                >
                  {choice.name}
                </p>
              );
            })}
          </section>
        )}
      </>
    );
  }

  if (formats) {
    return (
      <>
        {isLoading ? (
          <Spinner size={40} />
        ) : (
          <section className="flex flex-col gap-4 mt-8">
            <Image
              src={sitCat}
              alt="cat"
              width={80}
              height={80}
              className="absolute right-10  top-[-40px] lg:right-20"
            />
            {formats.map((format) => {
              return (
                <p
                  key={format.id}
                  onClick={() => handleClick(format.id)}
                  className="flex items-center justify-around  h-20 bg-[#E4B781] text-lg rounded-sm"
                >
                  {format.name}
                </p>
              );
            })}
          </section>
        )}
      </>
    );
  }

  if (series) {
    return (
      <>
        {isLoading ? (
          <Spinner size={40} />
        ) : (
          <section className="flex flex-col gap-4 mt-8">
            <Image
              src={sitCat}
              alt="cat"
              width={80}
              height={80}
              className="absolute right-10  top-[-40px] lg:right-20"
            />
            {series.map((serie) => {
              return (
                <Fragment key={serie.id}>
                  {modal !== 0 ? (
                    <SerieModal id={modal} onSetModal={() => setModal(0)} />
                  ) : (
                    <div className="flex items-center justify-between pl-4 pr-4  h-20 bg-[#E4B781] text-lg rounded-sm">
                      <p onClick={() => handleClick(serie.id)}>{serie.name}</p>
                      <div className="mb-12 ">
                        <Switch
                          serie={serie}
                          onSwitch={() => handleSwitch(serie)}
                        />
                      </div>
                    </div>
                  )}
                </Fragment>
              );
            })}
          </section>
        )}
      </>
    );
  }

  if (!valueChoice && !formats && !series)
    return (
      <section className="flex justify-center flex-col gap-12 items-center pt-24">
        <p>Pas de résultat trouvé, voulez-vous ajouter un livre?</p>
        <button className="bg-[#E4B781] text-lg rounded-sm p-2">
          <Link href="/">Ajouter un livre</Link>
        </button>
      </section>
    );
};

export default GeneralChoice;
