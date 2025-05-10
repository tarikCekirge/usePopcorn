import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

const Search = ({ query, setQuery }) => {
    const [input, setInput] = useState(query);
    const [debouncedInput] = useDebounce(input, 500);
    const inputEl = useRef(null);

    useEffect(() => {
        setQuery(debouncedInput);
    }, [debouncedInput, setQuery]);

    useEffect(() => {
        const handleEnterDown = (e) => {

            if (document.activeElement === inputEl.current) return
            if (e.code === "Enter" && inputEl.current) {
                inputEl.current.focus();
                setInput("");
                setQuery("");
            }
        };

        document.addEventListener("keydown", handleEnterDown);

        if (inputEl.current) {
            inputEl.current.focus();
        }

        return () => {
            document.removeEventListener("keydown", handleEnterDown);
        };
    }, [setQuery]);

    return (
        <input
            ref={inputEl}
            className="search"
            type="text"
            placeholder="Search movies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
    );
};

export default Search;
