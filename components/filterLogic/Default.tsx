import { getBooks } from "@/app/db.service";
import ListOfBooks from "../ListOfBooks";

const Default = async()=>{
    const allBooks = await getBooks();
    

    return(<ListOfBooks currentArray={allBooks} />)
}

export default Default