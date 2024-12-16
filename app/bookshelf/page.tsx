import SearchBar from "@/components/SearchBar";

import { getBooks } from "../db.service";

import Filter from "@/components/Filter";

import ReclaimModal from "@/components/Modals/ReclaimModal";
import { getVisibilityReclaimModal } from "@/actions/modal.action";

import Link from "next/link";
import SortBtn from "@/components/Buttons/SortBtn";
import RatingChoice from "@/components/RatingChoice";
import Default from "@/components/filterLogic/Default";
import Present from "@/components/filterLogic/Present";
import Absent from "@/components/filterLogic/Absent";
import Lend from "@/components/filterLogic/Lend";
import Author from "@/components/filterLogic/Author";
import Genre from "@/components/filterLogic/Genre";
import Format from "@/components/filterLogic/Format";
import Serie from "@/components/filterLogic/Serie";
import SearchBarResult from "@/components/filterLogic/SearchBarResult";

import AuthorChoosed from "@/components/filterLogic/AuthorChoosed";
import GenreChoosed from "@/components/filterLogic/GenreChoosed";
import FormatChoosed from "@/components/filterLogic/FormatChoosed";
import SerieChoosed from "@/components/filterLogic/SerieChoosed";
import RatingChoosed from "@/components/filterLogic/RatingChoosed";

const Page = async ({
  searchParams,
}: {
  searchParams: {
    filter: string;
    author?: string;
    genre?: string;
    format?: string;
    searchbar?: string;
    sort?: string;
    rating?: string;
    serie?: string;
  };
}) => {
  const filter = searchParams?.filter || "all";
  const sort = searchParams?.sort || "";

  const selectedAuthor = searchParams.author
    ? parseInt(searchParams.author, 10)
    : undefined;
  const selectedGenre = searchParams.genre
    ? parseInt(searchParams.genre, 10)
    : undefined;
  const selectedFormat = searchParams.format
    ? parseInt(searchParams.format, 10)
    : undefined;
  const searchBarValue = searchParams.searchbar;
  const selectedRating = searchParams.rating
    ? parseInt(searchParams.rating, 10)
    : undefined;

  const selectedSerie = searchParams.serie
    ? parseInt(searchParams.serie, 10)
    : undefined;

  const allBooks = await getBooks();

  const dateBorrow = allBooks.filter((book) => book.date);
  const reclaim = dateBorrow.filter((book) => {
    if (book.date) {
      const diffDate = new Date(book.date).getTime() - new Date().getTime();
      const diffInMonths = Math.floor(diffDate / (1000 * 60 * 60 * 24 * 30));
      return diffInMonths < -6;
    }
    return false;
  });

  const modalIsVisible = await getVisibilityReclaimModal();

  const display = () => {
    if (searchBarValue) {
      return <SearchBarResult searchBarValue={searchBarValue} />;
    }
    if (selectedAuthor) {
      return <AuthorChoosed authorChoosed={selectedAuthor} />;
    }
    if (selectedGenre) {
      return <GenreChoosed genreChoosed={selectedGenre} />;
    }
    if (selectedFormat) {
      return <FormatChoosed formatChoosed={selectedFormat} />;
    }
    if (selectedSerie) {
      return <SerieChoosed serieChoosed={selectedSerie} />;
    }
    if (selectedRating) {
      return <RatingChoosed ratingChoosed={selectedRating} />;
    }

    switch (sort) {
      case "author":
        return <Author />;
      case "genre":
        return <Genre />;
      case "format":
        return <Format />;
      case "serie":
        return <Serie />;
      case "rating":
        return <RatingChoice />;
    }
    switch (filter) {
      case "present":
        return <Present />;
      case "absent":
        return <Absent />;
      case "lend":
        return <Lend />;
      case "":
      case "all":
        return <Default />;
    }
  };

  return (
    <>
      {modalIsVisible && reclaim.length !== 0 && (
        <ReclaimModal array={reclaim} />
      )}

      <SearchBar />
      <details className="mt-4">
        <summary>Rechercher par :</summary>
        <div className=" flex justify-center gap-4 mt-4 flex-wrap ">
          <SortBtn value="author" />
          <SortBtn value="genre" />
          <SortBtn value="format" />
          <SortBtn value="serie" />
          <SortBtn value="rating" />
        </div>
      </details>

      <Filter />

      <div className="relative">
        {display()}
        
      </div>
    </>
  );
};

export default Page;
