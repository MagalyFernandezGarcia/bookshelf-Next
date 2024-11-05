import { useState } from "react";


const FormatChoice = () => {
  const [paperFormat, setPaperFormat] = useState(false);
  const [kindleFormat, setKindleFormat] = useState(false);

 const handlePaperClick = () => {
    setPaperFormat(!paperFormat);
    setKindleFormat(false);
  };

  const handleKindleClick = () => { 
    setKindleFormat(!kindleFormat);
    setPaperFormat(false);
 }
    return (
      <div className="flex  gap-4 mt-8">
        
        <label htmlFor="kindle" className="text-sm cursor-pointer flex items-center">
        <input 
          type="radio" 
          id="kindle" 
          name="format" 
          value="kindle" 
          className="hidden peer" 
          onClick={handleKindleClick}
        />
        <span  className=" relative w-4 h-4 border-2 border-[#311C0D] bg-[#E4B781] rounded-full flex justify-center mr-2 peer-checked:bg-[#E4B781] ">
         {kindleFormat ? <span className="w-2 h-2 bg-[#311C0D] rounded-full absolute right-[34px] top-[2px] "></span> :<span className="w-1 h-1 bg-[#311C0D] rounded-full absolute top-1/2 left-1/2 hidden "></span> } 
        </span>Kindle
        </label>
      
        <label htmlFor="paper" className="text-sm cursor-pointer flex items-center">
        <input 
          type="radio" 
          id="paper" 
          name="format" 
          value="paper" 
          className="hidden peer" 
          onClick={handlePaperClick}
        />
        <span  className=" relative w-4 h-4 border-2 border-[#311C0D] bg-[#E4B781] rounded-full flex justify-center mr-2 peer-checked:bg-[#E4B781] ">
        {paperFormat ? <span className="w-2 h-2 bg-[#311C0D] rounded-full absolute right-[34px] top-[2px] "></span> :<span className="w-1 h-1 bg-[#311C0D] rounded-full absolute top-1/2 left-1/2 hidden "></span> }
        </span>
        Papier</label>
      
      </div>
    );
  };

export default FormatChoice;
