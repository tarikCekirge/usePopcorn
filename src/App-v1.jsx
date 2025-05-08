import { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { tempMovieData, tempWatchedData } from "./data";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import ListBox from './components/ListBox';
import WatchedBox from './components/WachedMovieList'
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";

const App = () => {
  const [movies, setMovies] = useState(tempMovieData)
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Navbar >
        <Search />
        <NumResults movies={movies} />
      </Navbar>
      <Main >
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <ListBox>
          <WatchedSummary watched={watched} />
          <WatchedBox watched={watched} />
        </ListBox>
      </Main>
    </>
  )
}

export default App