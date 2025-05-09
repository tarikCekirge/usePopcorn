import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import ListBox from './components/ListBox';
import WatchedBox from './components/WatchedMovieList'
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("interstellar");

  const fetchMovies = async (searchTerm) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(`${apiUrl}&s=${searchTerm}`);
      if (!response.ok) throw new Error("Network Error");
      const data = await response.json();
      if (data.Response === "False") throw new Error("Movie not found!");
      return data;
    } catch (error) {
      console.error(error);
      setError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovies(query);
      if (data) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    };

    if (!query.length) {
      setMovies([])
      setError('')
      return
    }
    getData();
  }, [query]);

  return (
    <>
      <Navbar>
        <Search setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <ListBox>
          {isLoading && !error && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {!isLoading && error && <ErrorMessage message={error} />}
        </ListBox>
        <ListBox>
          <WatchedSummary watched={watched} />
          <WatchedBox watched={watched} />
        </ListBox>
      </Main>
    </>
  );
};

export default App;
