import SearchBar from "@/components/SearchBar";
import Image from "next/image";

import ListOfBooks from "@/components/ListOfBooks";
import {
  byAuthor,
  byFormat,
  byGenre,
  bySerie,
  getAuthors,
  getBooks,
  getFormats,
  getGenres,
  getSeries,
  searchAuthor,
  searchBooks,
} from "../db.service";
import { Author, Book } from "@prisma/client";
import GeneralChoice from "@/components/GeneralChoice";
import Filter from "@/components/Filter";

import sitCat from "@/images/sitCat.png";
import ReclaimModal from "@/components/Modals/ReclaimModal";
import { getVisibilityReclaimModal } from "@/actions/modal.action";

import Link from "next/link";
import SortBtn from "@/components/Buttons/SortBtn";
import RatingChoice from "@/components/RatingChoice";

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
  let currentArray: Book[] = [];
  let authors: Author[] = [];
  let searchArray: Book[] = [];
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

  switch (filter) {
    case "present":
      currentArray = allBooks.filter(
        (book) => book.borrower === "" && book.returned === false
      );
      break;
    case "absent":
      currentArray = allBooks.filter(
        (book) => book.borrower !== "" || book.returned === true
      );
      break;

    case "lend":
      currentArray = allBooks.filter((book) => book.borrower !== "");
      break;
    case "":
    case "all":
      currentArray = allBooks;
      break;
    default:
      currentArray = allBooks;
  }

  switch (sort) {
    case "author":
      authors = await getAuthors();
      break;
    case "genre":
      authors = await getGenres();
      break;
    case "format":
      authors = await getFormats();
      break;
    case "serie":
      authors = await getSeries();
      break
      
  }

  if (selectedAuthor) {
    searchArray = selectedAuthor ? await byAuthor(selectedAuthor) : [];
  }
  if (selectedGenre) {
    searchArray = selectedGenre ? await byGenre(selectedGenre) : [];
  }
  if (selectedFormat) {
    searchArray = selectedFormat ? await byFormat(selectedFormat) : [];
  }
  if (searchBarValue) {
    currentArray = await searchBooks(searchBarValue);
    authors = await searchAuthor(searchBarValue);
  }
  if (selectedRating) {
    currentArray = allBooks.filter((book) => book.rating === selectedRating);
  }
  if (selectedSerie) {
    searchArray= await bySerie(selectedSerie);
  }

  const dateBorrow = allBooks.filter((book) => book.date);
  const reclaim = dateBorrow.filter((book) => {
    if (book.date) {
      const diffDate = new Date(book.date).getTime() - new Date().getTime();
      const diffInMonths = Math.floor(diffDate / (1000 * 60 * 60 * 24 * 30));
      return diffInMonths < -6;
    }
    return false;
  });

  const test = () => {
    if (searchBarValue) {
      return (
        <>
          <ListOfBooks currentArray={currentArray} />
          <GeneralChoice valueChoice={authors} sort={filter} />
        </>
      );
    }

    if (sort === "rating") {
      if (selectedRating) {
        return <ListOfBooks currentArray={currentArray} />;
      } else {
        return <RatingChoice />;
      }
    } else {
      if (
        sort !== "" &&
        !searchParams.author &&
        !searchParams.genre &&
        !searchParams.format &&
        !searchParams.serie
      ) {
        return <GeneralChoice valueChoice={authors} sort={sort} />;
      }

      if (selectedAuthor || selectedGenre || selectedFormat || selectedSerie) {
        return <ListOfBooks currentArray={searchArray} />;
      }
    }

    return <ListOfBooks currentArray={currentArray} />;
  };
 

  const modalIsVisible = await getVisibilityReclaimModal();

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
        {currentArray.length > 0 && (
          <Image
            src={sitCat}
            alt="cat"
            width={80}
            height={80}
            className="absolute right-10  top-[-40px] lg:right-20"
          />
        )}
        {test()}

        {currentArray.length === 0 && searchArray.length === 0 && (
          <section className="flex justify-center flex-col gap-12 items-center pt-24">
            <p>Pas de résultat trouvé, voulez-vous ajouter un livre?</p>
            <button className="bg-[#E4B781] text-lg rounded-sm p-2">
              <Link href="/">Ajouter un livre</Link>
            </button>
          </section>
        )}
      </div>
    </>
  );
};

export default Page;
