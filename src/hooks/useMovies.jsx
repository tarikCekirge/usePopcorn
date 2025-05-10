import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const fetchMovies = async (searchTerm, controller) => {
    const response = await fetch(`${apiUrl}&s=${searchTerm}`, {
        signal: controller.signal,
    });
    if (!response.ok) throw new Error("Network Error");
    const data = await response.json();
    if (data.Response === "False") throw new Error("Movie not found!");
    return data;
};

export const useMovies = (query, callback) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (typeof callback === "function") {
            callback();
        }


        const controller = new AbortController();

        const getMovies = async () => {
            if (!query.length) {
                setMovies([]);
                setError('');
                return;
            }

            setIsLoading(true);
            setError("");

            try {
                const data = await fetchMovies(query, controller);

                setMovies(data.Search);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error(error);
                    setError(error.message);
                    setMovies([]);
                }
            } finally {
                setIsLoading(false);
            }
        };

        getMovies();

        return () => controller.abort();
    }, [query]);

    return { movies, isLoading, error };
};
