import React from 'react';

class FilterCheckbox extends React.Component {
  state = {
    checked: false,
  };

  handleChange = (e) => {
    const { checked } = this.state;
    const { returnFunction, identifier, filterType } = this.props;
    if (checked) {
      this.setState({ checked: false }, () => {
        returnFunction(false, identifier, filterType);
      });
    } else {
      this.setState({ checked: true }, () => {
        returnFunction(true, identifier, filterType);
      });
    }
  };

  render() {
    const { identifier, displayName } = this.props;
    const { checked } = this.state;
    return (
      <label className="filter-checkbox-label" htmlFor={identifier}>
        <input
          name={identifier}
          id={identifier}
          onChange={this.handleChange}
          type="checkbox"
          checked={checked}
        />
        {displayName}
      </label>
    );
  }
}

export default FilterCheckbox;
