import { getBooks } from "@/app/db.service";
import ListOfBooks from "../ListOfBooks"

const RatingChoosed = async({  ratingChoosed} : {ratingChoosed: number}) => {
    const allBooks = await getBooks();
    const filterRating =    allBooks.filter((book) => book.rating === ratingChoosed);
    
    

    return (<ListOfBooks currentArray={filterRating} />)
}

export default RatingChoosed