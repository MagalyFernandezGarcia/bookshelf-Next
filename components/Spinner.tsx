

const Spinner = ({size} : {size: number}) => {
  
  
    return (
        <div className="flex items-center justify-center py-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
           
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D8778D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin"
           
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>)
}

export default Spinner