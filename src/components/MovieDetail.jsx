import React from 'react'

const MovieDetail = ({ selectedId, handleCloseMovie }) => {
    return (

        <div className='details'>
            <button className='btn-back' onClick={handleCloseMovie}>&larr;</button>
            <div className='detail'>{selectedId}</div>
        </div>
    )
}

export default MovieDetail