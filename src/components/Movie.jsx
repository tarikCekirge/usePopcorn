import React from 'react'

const Movie = ({ movie, onSelectedMovie }) => {
    return (
        <li onClick={() => onSelectedMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓️</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}

export default Movie