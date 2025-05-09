
const WatchedMovie = ({ movie, onDelete }) => {
    return (
        <li >
            <img src={movie.poster} alt={`${movie.pitle} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
            <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>x</button>
        </li>
    )
}

export default WatchedMovie