import React from "react";
import WatchedMovie from "./WatchedMovie";

const WatchedMovieList = ({ watched, onDeleteWatch }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatch={onDeleteWatch}
        />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
