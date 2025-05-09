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

const App = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("inception");
  const [selectedId, setSelectedId] = useState(null)

  const fetchMovies = async (searchTerm, controller) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(`${apiUrl}&s=${searchTerm}`, {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Network Error");
      const data = await response.json();
      if (data.Response === "False") throw new Error("Movie not found!");
      return data;
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
        setError(error.message);
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };


  const handleSelectMovie = (movieId) => {
    setSelectedId(selectedId => (movieId === selectedId ? null : movieId))
  }

  const handleCloseMovie = () => {
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

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      if (!query.length) {
        setMovies([]);
        setError('');
        return;
      }

      const data = await fetchMovies(query, controller);
      if (data) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    })();

    return () => controller.abort();
  }, [query]);




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
