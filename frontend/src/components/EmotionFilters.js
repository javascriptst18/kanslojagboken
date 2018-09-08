import React from 'react';
import ToggleExpand from './ToggleExpand';
import SetUpEmotionFilters from './SetUpEmotionFilters';

class EmotionFilters extends React.Component {
  hiddenFilterRef = React.createRef(); // Create ref to be able to open hidden filter menu

  render() {
    const {
      colors,
      filterByColor,
      handleCheckbox,
      filtersOpen,
      openFiltersCallback,
    } = this.props;
    return (
      <React.Fragment>
        <button
          type="button"
          className="openFilters"
          onClick={() => {
            ToggleExpand(
              this.hiddenFilterRef.current,
              filtersOpen,
              openFiltersCallback
            );
          }}
        >
          {filtersOpen ? (
            <i className="fas fa-caret-down" />
          ) : (
            <i className="fas fa-caret-right" />
          )}
          {filterByColor.length > 0 ? (
            `Filter (${filterByColor.length})`
          ) : (
            <React.Fragment>
              Filtrera
              <i className="fas fa-sliders-h" />
            </React.Fragment>
          )}
        </button>
        <div
          className={`hidden-filters${filtersOpen ? ' visible' : ''}`}
          ref={this.hiddenFilterRef}
        >
          <SetUpEmotionFilters
            colors={colors}
            filterByColor={filterByColor}
            handleCheckbox={handleCheckbox}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default EmotionFilters;
