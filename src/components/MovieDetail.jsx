import { useEffect, useLayoutEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
const apiUrl = import.meta.env.VITE_API_URL;

const fetchMovieDetail = async (id) => {
    try {
        const response = await fetch(`${apiUrl}&i=${id}`);
        if (!response.ok) throw new Error("Network Error");
        const data = await response.json();
        if (data.Response === "False") throw new Error("Movie not found!");
        return data;
    } catch (error) {
        console.error(error);
    }
};

const MovieDetail = ({ watched, selectedId, handleCloseMovie, onAddWatched }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState({});
    const [userRating, setUserRating] = useState()
    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
    const watchedUserRating = watched.find(movie => movie.imdbID)?.userRating
    const {
        Title,
        Year,
        Rated,
        Released,
        Runtime,
        Genre,
        Director,
        Writer,
        Actors,
        Plot,
        Language,
        Country,
        Awards,
        Poster,
        Ratings,
        Metascore,
        imdbRating,
        imdbVotes,
        imdbID,
        Type,
        DVD,
        BoxOffice,
        Production,
        Website,
        Response,
    } = movie;

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const data = await fetchMovieDetail(selectedId);
                setMovie(data);
                setError(null);
                setUserRating(data.imdbRating)
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [selectedId]);

    useEffect(() => {
        if (!Title) return
        document.title = `Movie | ${Title}`;
        return () => document.title = 'usePopcorn'

    }, [Title]);


    const handleAdd = (movie) => {
        const newMovie = {
            imdbRating,
            imdbID,
            title: Title,
            yer: Year,
            runtime: Number(Runtime.split(' ').at(0)) || 0,
            poster: Poster,
            userRating: Number(userRating)
        }
        onAddWatched(newMovie)
        handleCloseMovie()
    }
    return (
        <div className="details">
            <button className="btn-back" onClick={handleCloseMovie}>
                &larr;
            </button>

            <div className="detail">
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <p className="error">{error}</p>
                ) : (
                    <>
                        <header>
                            <button className="btn-back" onClick={handleCloseMovie}>
                                &larr;
                            </button>
                            <img src={Poster} alt={`Poster of ${Title}`} />
                            <div className="details-overview">
                                <h2>
                                    {Title} ({Year})
                                </h2>
                                <p>
                                    <strong>Released:</strong> {Released}
                                </p>
                                <p>
                                    <strong>Genre:</strong> {Genre}
                                </p>
                                <p>
                                    <strong>IMDB Rating:</strong>⭐ {imdbRating}
                                </p>
                            </div>
                        </header>
                        <section>
                            {isWatched ?
                                <>
                                    <div className="rating"><p>You rated this movie: 🌟{watchedUserRating}</p></div>
                                </> :
                                <>
                                    <div className="rating">
                                        <StarRating
                                            onSetRating={setUserRating}
                                            size={24}
                                            maxRating={10}
                                            defaultRating={parseFloat(imdbRating) || 0}
                                        />
                                    </div>
                                    <button className="btn-add" onClick={() => handleAdd(movie)}>+ Add Watched</button>
                                </>
                            }
                            <p>

                                <em> {Plot}</em>
                            </p>
                            <p> <em>{Actors}</em></p>
                            <p>
                                <strong>Rated:</strong> {Rated}
                            </p>
                            <p>
                                <strong>Runtime:</strong> {Runtime}
                            </p>
                            <p>
                                <strong>Director:</strong> {Director}
                            </p>
                            <p>
                                <strong>Writer:</strong> {Writer}
                            </p>
                            <p>
                                <strong>Language:</strong> {Language}
                            </p>
                            <p>
                                <strong>Country:</strong> {Country}
                            </p>
                            <p>
                                <strong>Awards:</strong> {Awards}
                            </p>
                            {Ratings?.length > 0 && (
                                <div>
                                    <strong>Ratings:</strong>
                                    <ul>
                                        {Ratings.map((rating, index) => (
                                            <li key={index} style={{ listStyle: "inside" }}>
                                                {rating.Source}: {rating.Value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <p>
                                <strong>Metascore:</strong> {Metascore}
                            </p>
                            <p>
                                <strong>IMDB Votes:</strong> {imdbVotes}
                            </p>
                            <p>
                                <strong>IMDB ID:</strong> {imdbID}
                            </p>
                            <p>
                                <strong>Type:</strong> {Type}
                            </p>
                            <p>
                                <strong>DVD:</strong> {DVD}
                            </p>
                            <p>
                                <strong>Box Office:</strong> {BoxOffice}
                            </p>
                            <p>
                                <strong>Production:</strong> {Production}
                            </p>
                            <p>
                                <strong>Website:</strong>
                                {Website !== "N/A" ? (
                                    <a href={Website} target="_blank" rel="noopener noreferrer">
                                        {Website}
                                    </a>
                                ) : (
                                    "N/A"
                                )}
                            </p>
                            <p>
                                <strong>Response:</strong> {Response}
                            </p>
                        </section>
                    </>
                )}

            </div>
        </div>
    );
};

export default MovieDetail;
