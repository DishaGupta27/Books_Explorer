import React from "react";

const SearchBar = ({ items, setFilteredItems, setCurrentPage }) => {
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = items.filter((item) =>
            item.title.toLowerCase().includes(query)
        );
        setFilteredItems(filtered);
        setCurrentPage(1);
    };

    return (
        <input
            type="text"
            className="search-bar"
            placeholder="Search books..."
            onChange={handleSearch}
        />
    );
};

export default SearchBar;
