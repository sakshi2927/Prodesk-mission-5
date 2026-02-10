import React from 'react'

function SearchBar({ value, onChange }) {
    return (
        <div className="search-bar">
            <label htmlFor="taskSearch">Search</label>
            <input
                id="taskSearch"
                type="text"
                placeholder="Filter tasks by name"
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    )
}

export default SearchBar
