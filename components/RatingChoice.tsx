"use client";


import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Spinner from "./Spinner";

const RatingChoice = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();
  const ratingArray = new Array(5);

  for (let i = 1; i <= 5; i++) {
    const arrayOfHearts: JSX.Element[] = [];
    let count = 0;
    for (let j = 0; j < i; j++) {
      arrayOfHearts[j] = (
        <svg
          className="fill-[#A6596B] text-red-400 w-6 h-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          key={count++}
        >
          <path
            d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
            style={{ stroke: "#311C0D", strokeWidth: 20 }}
          />
        </svg>
      );
    }
    while (arrayOfHearts.length !== 5) {
      arrayOfHearts.push(
        <svg
          className="fill-white text-red-400 w-6 h-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          key={count++}
        >
          <path
            d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
            style={{ stroke: "#311C0D", strokeWidth: 20 }}
          />
        </svg>
      );
    }

    ratingArray[i] = arrayOfHearts;
  }

  const diplayArray = ratingArray.map((arrayOfHearts, index) => {
    return (
      <div
        key={index}
        className="flex items-center gap-2 justify-center  h-20 bg-[#E4B781] text-lg rounded-sm mb-4"
        onClick={() => handleClick(index)}
      >
        {arrayOfHearts}
      </div>
    );
  });

  const handleClick = (id: number) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams);
    if (params.has("searchbar")) {
      params.delete("searchbar");
      params.set("author", id.toString());
    }

    if (id) {
      params.set("rating", id.toString());
    } else {
      params.delete("rating");
    }

    replace(`${pathName}?${params.toString()}`);

    setTimeout(() => setIsLoading(false), 1400);
  };
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
    {isLoading ? <Spinner size={40} /> : <section className="mt-8">{diplayArray.reverse()}</section>}
    
    </>
    
  );
};

export default RatingChoice;
