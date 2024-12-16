import { getSeries } from "@/app/db.service";
import GeneralChoice from "../GeneralChoice";

const Serie = async()=>{
    
    
    const series = await getSeries();

    return(<GeneralChoice series={series} sort="serie"/>)
}

export default Serie