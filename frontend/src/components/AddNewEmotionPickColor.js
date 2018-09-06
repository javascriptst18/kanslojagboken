import React from 'react';
import './css/AddNewEmotionDialogue.css';

class AddNewEmotionPickColor extends React.Component {
  state = {
    checked: '',
  };

  handleChange = (e) => {
    const { handleCheckbox } = this.props;
    this.setState({ checked: e.target.value }, () => {
      const { checked } = this.state;
      handleCheckbox(checked);
    });
  };

  render() {
    const { checked } = this.state;
    const { colors } = this.props;
    const colorOutput = colors.map((color) => (
      <label className="add-new-color-label" htmlFor={color}>
        <input
          type="radio"
          id={color}
          value={color}
          checked={checked === color}
          onChange={this.handleChange}
        />
        <span className={color}>
          {checked === color && <i className="fas fa-check" />}
        </span>
      </label>
    ));
    return colorOutput;
  }
}

export default AddNewEmotionPickColor;
