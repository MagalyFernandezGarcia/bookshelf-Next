import { getBooks } from "@/app/db.service";
import ListOfBooks from "../ListOfBooks";

const Present = async()=>{
    const allBooks = await getBooks();
    const arrayOfBooks =  allBooks.filter(
        (book) => book.borrower === "" && book.returned === false
    );

    return(<ListOfBooks currentArray={arrayOfBooks} />)
}

export default Present