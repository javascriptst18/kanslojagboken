import React from 'react';
import './css/AddNewEmotionDialogue.css';

// Function for picking color when adding a new emotion
class AddNewEmotionPickColor extends React.Component {
  state = {
    checked: '',
  };

  // function for keeping track of which checkbox is checked,
  // and sending it to the parent component
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
    // map all the colors and output them to the user
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
