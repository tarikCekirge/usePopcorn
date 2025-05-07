import React, { useState } from 'react'
import WatchedSummary from './WatchedSummary';
import WachedMovieList from './WachedMovieList';

const WatchedBox = ({ watched }) => {
    const [isOpen2, setIsOpen2] = useState(true);


    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen2((open) => !open)}
            >
                {isOpen2 ? "–" : "+"}
            </button>
            {isOpen2 && (
                <>
                    <WatchedSummary watched={watched} />
                    <WachedMovieList watched={watched} />
                </>
            )}
        </div>
    )
}

export default WatchedBox