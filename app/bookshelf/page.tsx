

import SearchBar from "@/components/SearchBar";



import ListOfBooks from "@/components/ListOfBooks";
import { byAuthor, getAuthors, getBooks } from "../db.service";
import { Author, Book } from "@prisma/client";
import GeneralChoice from "@/components/GeneralChoice";

import Filter from "@/components/Filter";


const Page = async ({ searchParams }: { searchParams: { filter: string, author?: string }  }) => {
  
  
  const filter = searchParams?.filter || 'all'
  let currentArray: Book[] = [];
  let authors: Author[] = [];
  let searchArray : Book[] = [];
  const selectedChoice = searchParams.author ? parseInt(searchParams.author, 10) : undefined;

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
  

  if(selectedChoice){

   searchArray= selectedChoice ? await byAuthor(selectedChoice) : [];
  }

  
  
  
  
  
  

  
  return (
    <>
      <SearchBar />
      <Filter />

      
      {
  selectedChoice ? (
    <ListOfBooks currentArray={searchArray} />
  ) : filter === "author" || filter === "genre" ? (
    <GeneralChoice valueChoice={authors} />
  ) : (
    <ListOfBooks currentArray={currentArray} />
  )
}
      
    </>
  );
};

export default Page;
