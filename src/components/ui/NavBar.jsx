import { useContext, useEffect, useState } from "react";
import { Context } from "../../provider/global-state-provider";
import { Link } from "react-router-dom";
import Handler from "./Handler";

function NavBar({ type = "full" }) {
  const {
    setPrevSearch,
    movies,
    setMovies,
    setIsLoading,
    errorMessage,
    setErrorMessage,
    watchList,
    isOpen,
    setIsOpen,
  } = useContext(Context);


  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query !== "") {
      setErrorMessage("");
      setIsLoading(true);
    }
    setPrevSearch(null)
    const timer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => {
      setIsLoading(false);
      clearTimeout(timer);
    };
  }, [query]);

  async function fetchMovies() {
    if (query === "") {return setMovies(null)}
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?s=${query.trim()}&apikey=${
          import.meta.env.VITE_OMDB
        }`
      );
      if (!res.ok) throw new Error("Failed to fetch movies..!!");
      const data = await res.json();
      if (data.Response === "False") throw new Error(data.Error);
      setMovies(Array.from(new Set(data.Search)));
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleIsOpen() {
    if(watchList.length === 0) return
    setIsOpen(p=>!p)
  }

  return (
    <div
      style={{
        height: 100,
        background: "ghostwhite",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        gap: "2rem",
      }}
    >
      <Link to="..">
        {" "}
        <h1>
          Movie
          <span
            style={{ background: "red", color: "white", padding: "0 .3rem" }}
          >
            flix
          </span>
        </h1>
      </Link>
      <input
      name="query"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        style={{
          fontSize: "1.06rem",
          padding: ".8rem",
          borderRadius: "16px",
          border: "none",
          outlineColor: "orange",
          boxShadow: "0 0 2px grey",
        }}
        type="text"
        placeholder="Search"
      />
      <b
        style={{
          marginLeft: "auto",
          fontSize: "1.05rem",
          fontWeight: "lighter",
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
      <p className="result-count">{movies?.length || 0} Movie found</p>
      <Handler handler={handleIsOpen} style={{fontSize: '0.8rem' , padding: "1rem" , backgroundColor: 'lightgreen'}}>{watchList.length} Saved</Handler>
      </b>
    </div>
  );
}

export default NavBar;
