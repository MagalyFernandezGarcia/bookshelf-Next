import { getBooks } from "@/app/db.service";
import ListOfBooks from "../ListOfBooks";

const Lend = async()=>{
    const allBooks = await getBooks();
    const arrayOfBooks =  allBooks.filter((book) => book.borrower !== "");

    return(<ListOfBooks currentArray={arrayOfBooks} />)
}

export default Lend