import { byGenre } from "@/app/db.service";
import ListOfBooks from "../ListOfBooks"

const GenreChoosed = async({ genreChoosed} : {genreChoosed : number}) => {
    const genreArray = await byGenre(genreChoosed);
    
    

    return (<ListOfBooks currentArray={genreArray} />)
}

export default GenreChoosed