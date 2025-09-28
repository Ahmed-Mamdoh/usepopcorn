import { useEffect, useState } from "react";
import NavBar from "./NavBar/NavBar.jsx";
import Main from "./Main";
import Search from "./NavBar/Search.jsx";
import NumResults from "./NavBar/NumResults.jsx";
import MovieList from "./ListBox/MovieList.jsx";
import Box from "./Shared/Box.jsx";
import WatchedSummary from "./WatchedBox/WatchedSummary.jsx";
import WatchedMovieList from "./WatchedBox/WatchedMovieList.jsx";
import Loader from "./Shared/Loader.jsx";
import ErrorMessage from "./Shared/ErrorMessage.jsx";
import MovieDetails from "./WatchedBox/MovieDetails.jsx";
import { useMovies } from "./hooks/useMovies.js";
import { useLocalStorageState } from "./hooks/useLocalStorageState.js";

const KEY = "176ca661";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  // const [watched, setWatched] = useState(() => {
  //   const storedWatched = localStorage.getItem("watched");
  //   return JSON.parse(storedWatched);
  // });

  function handleSelectMovie(id) {
    if (id === selectedId) {
      setSelectedId(null);
      return;
    }
    setSelectedId(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatch(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatch(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatch={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatch={handleDeleteWatch}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
