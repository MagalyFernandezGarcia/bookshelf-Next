

const SearchBar = () => {

    return (<form className=" flex flex-col  place-content-center relative">
        <input
            type="text"
            placeholder="Rechercher"
            className="bg-[#E4B781] placeholder-[#311C0D] placeholder-opacity-50 w-80 h-8 text-center rounded-2xl mt-6"
        />
    </form>)
    
}

export default SearchBar