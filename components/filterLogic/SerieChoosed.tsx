import { bySerie } from "@/app/db.service";
import ListOfBooks from "../ListOfBooks"

const SerieChoosed = async({ serieChoosed} : {serieChoosed: number}) => {
    const serieArray = await bySerie(serieChoosed);
    
    

    return (<ListOfBooks currentArray={serieArray} />)
}

export default SerieChoosed