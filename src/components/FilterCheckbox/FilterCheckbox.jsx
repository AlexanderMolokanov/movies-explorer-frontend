import React from "react";

function FilterCheckbox({ onFilter, isShortFilms }) {
  return (
    <form className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        onChange={onFilter}
        checked={isShortFilms}
      ></input>
      <span className="filter__text">Короткометражки</span>
    </form>
  );
}

export default FilterCheckbox;
