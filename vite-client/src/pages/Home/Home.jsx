import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGames,
  sort_AZ_ZA,
  sort_by_Rating,
  isCreated,
  setLoading,
  getPlatforms,
  getGenres,
  filterByGenre,
} from "../../redux/actions";
import { Link } from "react-router-dom";
// import CardGame from "../CardGame/CardGame";

import SearchBar from "../../components/SearchBar/SearchBar";
// import FilterByGenre from "../FilterByGenre/FilterByGenre";
import Cards from "../../components/Cards/Cards";
import styles from "./home.module.css";
import Order from "../../components/Order/Order";
import Filter from "../../components/Filter/Filter";
import Paginado from "../../components/Paginado/paginado";
import Loading from "../../components/Loading/Loading";
// import Loading from "../Loading/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const { showVideoGames, videogamesQty, genres } = useSelector(
    (state) => state
  );
  const loading = useSelector((state) => state.loading);
  // const [currentPage, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [filtered, setFiltered] = useState(showVideoGames);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getGames());
  }

  function handleClickPage(page) {
    dispatch(getGames(page));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(sort_AZ_ZA(e.target.value));
  }

  function handleChangeSearchBar(e) {
    e.preventDefault();
    setSearchString(e.target.value);
  }

  function handleSubmitSearchBar(e) {
    e.preventDefault();
    const filtered = showVideoGames.filter((vg) =>
      vg.name.toLowerCase().includes(searchString)
    );
    setFiltered(filtered);
  }

  function handleRating(e) {
    dispatch(sort_by_Rating(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(isCreated(e.target.value));
  }
  function handleFilterGenre(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
  }

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getGames());
    dispatch(getPlatforms());
    dispatch(getGenres());
    // setFiltered(filtered);
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : (
    <>
      {
        // <div className="md:w-32 lg:w-48">
        <div>
          <div className={styles.nav}>
            <h1 className="self-center p-8">Henry Videogames</h1>

            <div className="flex items-center justify-evenly">
              <Filter
                name={"Filter by Genre"}
                opts={genres}
                handleFilter={handleFilterGenre}
              />

              <Order
                name={"Sort Alphabetical"}
                opts={[
                  { value: "az", name: "A-Z" },
                  { value: "za", name: "Z-A" },
                ]}
                handleSort={handleSort}
              />
              <Filter
                name={"Source"}
                opts={[
                  { value: "Created", name: "Created" },
                  { value: "Existent", name: "Existent" },
                ]}
                handleFilter={handleFilterCreated}
              />

              <Order
                name={"Sort Rating"}
                opts={[
                  { value: "best", name: "Rating ⬆" },
                  { value: "worst", name: "Rating ⬇" },
                ]}
                handleSort={handleRating}
              />
              <div>
                <button
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  Reload videogames
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center pt-4">
              <SearchBar
                handleChange={handleChangeSearchBar}
                handleSubmit={handleSubmitSearchBar}
              />
              <div>
                <Link to="/videogame/create">
                  <button>
                    <b>Create Videogame</b>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div style={{ padding: "2rem", display: "flex", flexWrap: "wrap" }}>
            <Cards videogames={showVideoGames} />
          </div>
          <Paginado
            vgPerPage={15}
            videogamesQty={videogamesQty}
            paginado={handleClickPage}
          />
        </div>
      }
    </>
  );
}
