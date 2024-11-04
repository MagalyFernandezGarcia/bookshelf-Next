const Switch = () => {

    return (
        <div className="flex flex-col mt-6">
      <label htmlFor="switch" className="relative inline-block w-16 h-8 text-xs cursor-pointer">
        <span className="absolute left-[12px]">Rendu</span> 
        <input 
          type="checkbox" 
          id="switch" 
          className="opacity-0 w-0 h-0" 
        />
        <span className="slider block w-full h-full bg-[#D8778D] transition-all duration-300 rounded-full relative">
          <span className="absolute bottom-1 left-1 h-6 w-6 bg-white transition-transform duration-300 rounded-full"></span>
        </span>
        
        <style>
          {`
            input:checked + span {
              background-color: #0FA958; 
            }
            
            input:focus + span {
              box-shadow: 0 0 1px #0FA958; 
            }
            
            input:checked + span span {
              transform: translateX(2rem); 
            }
          `}
        </style>
      </label>
    </div>
)}

export default Switch