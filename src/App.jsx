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

const apiUrl = import.meta.env.VITE_API_URL;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [query, setQuery] = useState("interstellar");

  const fetchMovies = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${apiUrl}&s=${query}`);
      if (!response.ok) throw new Error("Network Error");
      const data = await response.json();
      if (data.Response === "False") throw new Error("Movie not found!");
      console.log(data)
      setIsLoading(false)
      return data;
    } catch (error) {
      console.error(error);
      setError(error.message)
      return null;
    } finally {
      setIsLoading(false)

    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchMovies();
      if (data) {
        setMovies(data.Search);
      }
    };
    getData();
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
