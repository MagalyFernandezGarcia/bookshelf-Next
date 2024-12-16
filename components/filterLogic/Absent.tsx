import { getBooks } from "@/app/db.service";
import ListOfBooks from "../ListOfBooks";

const Absent = async()=>{
    const allBooks = await getBooks();
    const arrayOfBooks =   allBooks.filter(
        (book) => book.borrower !== "" || book.returned === true
    );

    return(<ListOfBooks currentArray={arrayOfBooks} />)
}

export default Absent