import { searchAuthor, searchBooks, searchSerie } from "@/app/db.service";
import ListOfBooks from "../ListOfBooks";
import GeneralChoice from "../GeneralChoice";

const SearchBarResult = async ({
  searchBarValue,
}: {
  searchBarValue: string;
}) => {
  const currentArray = await searchBooks(searchBarValue);
  const authors = await searchAuthor(searchBarValue);
  const series = await searchSerie(searchBarValue);

  return (
    <div>
      <ListOfBooks currentArray={currentArray} />
      <GeneralChoice valueChoice={authors} sort="author" />
      <GeneralChoice valueChoice={series} sort="serie" />
    </div>
  );
};

export default SearchBarResult;
