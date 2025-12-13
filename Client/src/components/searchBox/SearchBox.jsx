import React from 'react'
import { useState } from 'react';

function SearchBox({onSearch}) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        const text = e.target.value;
        setSearchQuery(text);
        onSearch(text);
    };

    return (
        <div>
           <div className='input-group mb-3'>
            <input type="text" className='form-control' placeholder='Search items...' value={searchQuery} onChange={handleSearch}/>
            <span className='input-group-text bg-warning'>
                <i className='bi bi-search'></i>
            </span>
           </div>
        </div>
    )
}

export default SearchBox;