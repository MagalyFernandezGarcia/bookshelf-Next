import { getAuthors } from "@/app/db.service";
import GeneralChoice from "../GeneralChoice";

const Author = async()=>{
    const authors = await getAuthors();

    return(<GeneralChoice valueChoice={authors} sort="author"/>)
}

export default Author