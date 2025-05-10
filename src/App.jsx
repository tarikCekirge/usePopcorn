import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import ListBox from './components/ListBox';
import WachedMovieList from './components/WatchedMovieList'
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetail from "./components/MovieDetail";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

const App = () => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useLocalStorageState("watched", []);


  const { movies, isLoading, error } = useMovies(query, handleCloseMovie)




  const handleSelectMovie = (movieId) => {
    setSelectedId(selectedId => (movieId === selectedId ? null : movieId))
  }

  function handleCloseMovie() {
    setSelectedId(null)

  }

  const handleAddWatched = (movie) => {
    setWatched((watched) => {
      const alreadyExists = watched.some(item => item.imdbID === movie.imdbID);
      if (alreadyExists) return watched;
      return [movie, ...watched];
    });
  };

  const handleDeleteWatched = (id) => {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
    setSelectedId(null)
  }


  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <ListBox>
          {isLoading && !error && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectedMovie={handleSelectMovie} />}
          {!isLoading && error && <ErrorMessage message={error} />}
        </ListBox>
        <ListBox>
          {selectedId ? <MovieDetail watched={watched} onAddWatched={handleAddWatched} selectedId={selectedId} handleCloseMovie={handleCloseMovie} /> : (
            <>
              <WatchedSummary watched={watched} />
              <WachedMovieList watched={watched} onDelete={handleDeleteWatched} />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
};

export default App;
