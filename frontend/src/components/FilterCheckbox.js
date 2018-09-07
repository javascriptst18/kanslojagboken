import React from 'react';
import './css/FilterCheckbox.css';

class FilterCheckbox extends React.Component {
  state = {
    checked: false,
  };

  componentDidMount() {
    const { checked } = this.props;
    if (checked) {
      this.setState({ checked: true });
    }
  }

  handleChange = () => {
    const { checked } = this.state;
    const { returnFunction, color } = this.props;
    if (checked) {
      this.setState({ checked: false }, () => {
        returnFunction(false, color);
      });
    } else {
      this.setState({ checked: true }, () => {
        returnFunction(true, color);
      });
    }
  };

  render() {
    const { color } = this.props;
    const { checked } = this.state;
    return (
      <label className="filter-checkbox-label" htmlFor={color}>
        <input
          name={color}
          id={color}
          onChange={this.handleChange}
          type="checkbox"
          checked={checked}
        />
        <span className={color}>
          {checked && <i className="fas fa-check" />}
        </span>
      </label>
    );
  }
}

export default FilterCheckbox;
