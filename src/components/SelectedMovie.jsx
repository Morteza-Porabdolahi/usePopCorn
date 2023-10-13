import { useState, useEffect } from "react";
import { useFetch, useKey } from "../customHooks/index";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import { StarRating } from "./StarRating/StarRating";
import { API_KEY } from "../uitls/utils";

export function SelectedMovie({ selectedMovieInWatched, selectedId, onResetSelectedMovie, onAddWatched }) {
  const [userRating, setUserRating] = useState(0);
  const [selectedMovie, isLoading, error] = useFetch({}, `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`, selectedId);
  useKey("Escape", onResetSelectedMovie);


  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = selectedMovie;

  useEffect(function () {
    if (title) {
      document.title = `MOVIE | ${title}`;
    }

    return function () {
      document.title = 'usePopcorn';
    };

  }, [title]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbRating: +imdbRating,
      title,
      year,
      poster,
      userRating,
      imdbID: selectedId,
      runtime: +runtime.split(' ')[0],
    };

    onAddWatched(newWatchedMovie);
    onResetSelectedMovie();
  }

  return (
    <div className="details">
      {error ? <ErrorMessage message={error} /> : isLoading ? <Loader /> :
        (
          <>
            <header>
              <img src={poster} alt={`Poster of the ${title} movie`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>{released} &bull; {runtime}</p>
                <p>{genre}</p>
                <p><span></span>{imdbRating} IMDB rating</p>
              </div>
            </header>
            <section>
              <div className='rating'>
                {selectedMovieInWatched ?

                  (
                    <p>You rated this movie as {selectedMovieInWatched.userRating}</p>
                  )
                  :
                  <>
                    <StarRating className="star-rating" maxRating={10} onSetRating={setUserRating} iconSize={24} textSize={20} />
                    {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to list</button>}
                  </>}
              </div>

              <p><em>{plot}</em></p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      <button className="btn-back" onClick={onResetSelectedMovie}>&larr;</button>
    </div>
  );
}
