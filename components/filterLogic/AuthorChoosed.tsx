import { byAuthor } from "@/app/db.service"
import ListOfBooks from "../ListOfBooks"

const AuthorChoosed = async({authorChoosed} : {authorChoosed : number}) => {
    const authorArray = await byAuthor(authorChoosed);
    
    

    return (<ListOfBooks currentArray={authorArray} />)
}

export default AuthorChoosed