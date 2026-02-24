import React from 'react';

const Filterbar = ({ search, onSearch, searchPlaceholder, filters = [] }) => {
  return (
    <div className="filterbar">
      <input
        className="filter-search"
        type="text"
        value={search}
        placeholder={searchPlaceholder}
        onChange={(event) => onSearch(event.target.value)}
      />

      {filters.map((filter) => (
        <select
          key={filter.key}
          className="filter-select"
          value={filter.value}
          onChange={(event) => filter.onChange(event.target.value)}
        >
          {filter.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default Filterbar;
