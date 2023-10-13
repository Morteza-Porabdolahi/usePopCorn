import { useState, useEffect } from "react";
import { useLocalStorageFunction } from "./customHooks/index";
import { ErrorMessage, ListBox, Loader, Main, MovieList, Navbar, NumResult, Search, SelectedMovie, WatchedMovieList, WatchedSummary } from './components/index';

import { API_KEY } from "./uitls/utils";

export function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageFunction([], 'watched');

  const selectedMovieInWatched = watched.find(watchedMovie => watchedMovie.imdbID === selectedId);

  function handleSelectMovie(id) {
    setSelectedId(selectedId === id ? null : id);
  }

  function handleResetSelectedMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  function handleRemoveWatched(id) {
    setWatched(watched => watched.filter(watchedMovie => watchedMovie.imdbID !== id))
  }

  useEffect(function () {
    let fetchController = new AbortController();

    async function fetchMovies() {
      try {
        setError('');
        setIsLoading(true);

        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`, { signal: fetchController.signal });

        if (!res.ok) throw new Error('Something went wrong with fetching Movies !');

        const data = await res.json();

        if (data.Error) throw new Error(data.Error);

        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setIsLoading(false);
          setError(err.message)
          console.log(err);
        }
      }
    }

    if (!query.length) {
      setMovies([]);
      setError("");
    } else {
      fetchMovies()
    }

    return function () {
      if (fetchController) {
        fetchController.abort();
      }
    }
  }, [query]);

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <ListBox>
          {error ? <ErrorMessage message={error} /> : isLoading ? <Loader /> : <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
        </ListBox>
        <ListBox>
          {selectedId ? <SelectedMovie selectedMovieInWatched={selectedMovieInWatched} onAddWatched={handleAddWatched} onResetSelectedMovie={handleResetSelectedMovie} selectedId={selectedId} /> : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} onRemoveWatched={handleRemoveWatched} />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}
