

const FormatChoice = () => {
    return (
      <div className="flex  gap-4 mt-8">
        
        <label htmlFor="kindle" className="text-sm cursor-pointer flex items-center">
        <input 
          type="radio" 
          id="kindle" 
          name="format" 
          value="kindle" 
          className="hidden peer" 
        />
        <span className=" relative w-4 h-4 border-2 border-[#311C0D] bg-[#E4B781] rounded-full flex justify-center mr-2 peer-checked:bg-[#E4B781] peer-checked:border-transparent">
          <span className="w-1 h-1 bg-[#311C0D] rounded-full absolute top-1/2 left-1/2 hidden peer-checked:block !important"></span>
        </span>Kindle
        </label>
      
        <label htmlFor="paper" className="text-sm cursor-pointer flex items-center">
        <input 
          type="radio" 
          id="paper" 
          name="format" 
          value="paper" 
          className="hidden peer" 
        />
        <span className=" relative w-4 h-4 border-2 border-[#311C0D] bg-[#E4B781] rounded-full flex justify-center mr-2 peer-checked:bg-[#E4B781] peer-checked:border-transparent">
          <span className="w-1 h-1 bg-[#311C0D] rounded-full absolute top-1/2 left-1/2 hidden peer-checked:block !important"></span>
        </span>
        Papier</label>
      
      </div>
    );
  };

export default FormatChoice;
