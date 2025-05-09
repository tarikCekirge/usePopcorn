import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const Search = ({ query, setQuery }) => {
    const [input, setInput] = useState(query);
    const [debouncedInput] = useDebounce(input, 500);

    useEffect(() => {
        setQuery(debouncedInput);
    }, [debouncedInput, setQuery]);

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
    );
};

export default Search;
