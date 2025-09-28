import { useEffect, useRef, useState } from "react";
import StarRating from "./../Shared/StarRating";
import Loader from "../Shared/Loader";
import { useKey } from "../hooks/useKey";
const KEY = "176ca661";

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatch, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  function handleAdd() {
    const newWatchMovie = {
      imdbId: selectedId,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(" ")[0]),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatch(newWatchMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(() => {
    if (!movie.Title) return;

    document.title = `Movie | ${movie.Title}`;
    return function () {
      document.title = "Popcorn";
    };
  }, [movie]);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  useKey("Escape", onCloseMovie);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={movie.Title} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span> {movie.imdbRating}
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {watched.find((movie) => movie.imdbId === selectedId) ? (
                <p>
                  You rated this movie{" "}
                  {
                    watched.find((movie) => movie.imdbId === selectedId)
                      .userRating
                  }{" "}
                  ⭐
                </p>
              ) : (
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
              )}
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add To List
                </button>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
