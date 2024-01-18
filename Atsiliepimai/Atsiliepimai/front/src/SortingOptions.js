import React from "react";

const SortingOptions = ({ sortBy, setSortBy }) => {

  return (
    <select
      className="sorting-options form-select"
      onChange={(e) => setSortBy(e.target.value)}
      value={sortBy}
    >
      <option value="new">Newest first</option>
      <option value="old">Oldest first</option>
      <option value="good">Highest rated</option>
      <option value="bad">Lowest rated</option>
    </select>
  );
};

export default SortingOptions;
