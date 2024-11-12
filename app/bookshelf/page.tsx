

import SearchBar from "@/components/SearchBar";



import ListOfBooks from "@/components/ListOfBooks";
import { getAuthors, getBooks } from "../db.service";
import { Author, Book } from "@prisma/client";
import GeneralChoice from "@/components/GeneralChoice";

import Filter from "@/components/Filter";

const Page = async ({ searchParams }: { searchParams: { filter: string } }) => {
  
   const filter = searchParams?.filter || 'all'
  let currentArray: Book[] = [];
  let authors: Author[] = [];

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
    case "author":
      authors = await getAuthors();
      break;
    default:
      currentArray = allBooks;
  }
  

  

  
  return (
    <>
      <SearchBar />
      <Filter />

      
      {/* {value === "author" || value === "genre" ? (
        <GeneralChoice valueChoice={authors} />
      ) : (
        <ListOfBooks currentArray={currentArray} />
      )} */}
      <ListOfBooks currentArray={currentArray} />
    </>
  );
};

export default Page;
