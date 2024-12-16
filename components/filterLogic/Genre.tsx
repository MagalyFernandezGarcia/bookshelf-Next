import { getGenres } from "@/app/db.service";
import GeneralChoice from "../GeneralChoice";

const Genre = async()=>{
    const authors = await getGenres();

    return(<GeneralChoice valueChoice={authors} sort="genre"/>)
}

export default Genre