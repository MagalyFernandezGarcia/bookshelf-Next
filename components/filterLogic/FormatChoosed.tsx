import { byFormat } from "@/app/db.service";
import ListOfBooks from "../ListOfBooks";

const FormatChoosed= async({ formatChoosed} : {formatChoosed : number}) => {
    const formatArray = await byFormat(formatChoosed);
    
    

    return (<ListOfBooks currentArray={formatArray} />)
}

export default FormatChoosed