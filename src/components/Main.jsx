import React, { useState } from 'react'
import { tempMovieData, tempWatchedData } from '../data'
import ListBox from './ListBox';
import WatchedBox from './WatchedBox';


const Main = () => {


    const [movies, setMovies] = useState(tempMovieData);
    const [watched, setWatched] = useState(tempWatchedData);



    return (
        <>
            <main className="main">
                <ListBox movies={movies} watched={watched} />
                <WatchedBox watched={watched} />
            </main>
        </>
    )
}

export default Main