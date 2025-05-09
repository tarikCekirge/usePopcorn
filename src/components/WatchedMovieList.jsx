import React from 'react'
import WatchedMovie from './WatchedMovie'

const WachedMovieList = ({ watched, onDelete }) => {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie key={movie.imdbID} movie={movie} onDelete={onDelete} />
            ))}
        </ul>
    )
}

export default WachedMovieList