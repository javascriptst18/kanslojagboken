import React from 'react';
import FilterCheckbox from './FilterCheckbox';

function SetUpEmotionFilters(props) {
  const { colors, filterByColor, handleCheckbox } = props;
  // set up filters
  let emotionFiltersOutput = [];
  if (colors.length > 0) {
    emotionFiltersOutput = colors.map((item) => {
      let checked = false;
      if (filterByColor.includes(item)) {
        checked = true;
      }
      return (
        <FilterCheckbox
          key={item}
          color={item}
          returnFunction={handleCheckbox}
          checked={checked}
        />
      );
    });
  }
  return (
    <div className="inner-filters">
      <div className="filter-color-wrapper">
        <p>Filtrera efter färg:</p>
        {emotionFiltersOutput}
      </div>
    </div>
  );
}

export default SetUpEmotionFilters;
