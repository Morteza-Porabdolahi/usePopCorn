import { WatchedMovie } from "./WatchedMovie";

export function WatchedMovieList({ watched, onRemoveWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} onRemoveWatched={onRemoveWatched} key={movie.imdbID} />
      ))}
    </ul>
  );
}
