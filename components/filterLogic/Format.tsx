import { getFormats } from "@/app/db.service";
import GeneralChoice from "../GeneralChoice";

const Format= async()=>{
    const formats = await getFormats();

    return(<GeneralChoice formats={formats} sort="format"/>)
}

export default Format