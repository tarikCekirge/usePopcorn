import React, { useState } from 'react'
import { tempMovieData } from '../data'
import Movie from './Movie'

const MovieList = () => {
    const [movies, setMovies] = useState(tempMovieData)
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <Movie key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    )
}

export default MovieList