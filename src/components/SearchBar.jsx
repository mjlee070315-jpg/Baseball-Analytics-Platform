function SearchBar({ search, setSearch, onSearch }) {



  const handleSubmit = (e) => {


    e.preventDefault();


    onSearch();


  };





  return (


    <form

      className="search-container"

      onSubmit={handleSubmit}

    >



      <input


        className="search"


        type="text"


        placeholder="Search MLB Player..."


        value={search}


        onChange={(e)=>setSearch(e.target.value)}


      />





      <button


        className="search-button"


        type="submit"


      >


        Search


      </button>





    </form>


  );


}


export default SearchBar;