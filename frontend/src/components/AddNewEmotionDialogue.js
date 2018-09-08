import React from 'react';
import AddNewEmotionPickColor from './AddNewEmotionPickColor';
import './css/AddNewEmotionDialogue.css';

// Function for creating the dialogue that lets the user add new emotions
class AddNewEmotionDialogue extends React.Component {
  state = {
    inputText: '',
    colors: [
      'red',
      'green',
      'blue',
      'orange',
      'purple',
      'pink',
      'yellow',
      'turquoise',
    ],
    selectedColor: '',
  };

  // Function for keeping track of whats written in the input field,
  // and outputting it in the preview
  handleChange = (e) => {
    const { previewFunction } = this.props;
    this.setState({ inputText: e.target.value }, () => {
      const { inputText, selectedColor } = this.state;
      previewFunction(inputText, selectedColor);
    });
  };

  // Function for keeping track of which color the user picks,
  // and outputting it in the preview
  handleCheckbox = (color) => {
    const { previewFunction } = this.props;
    this.setState({ selectedColor: color }, () => {
      const { inputText, selectedColor } = this.state;
      previewFunction(inputText, selectedColor);
    });
  };

  render() {
    const { inputText, colors } = this.state;
    return (
      <div className="add-new-emotion-wrapper">
        <label htmlFor="new-emotion" className="new-emotion-label">
          Lägg till ny känsla:
          {/* This is where the user writes the new emotion */}
          <input
            type="text"
            name="new-emotion"
            id="new-emotion"
            value={inputText}
            onChange={this.handleChange}
          />
        </label>
        <p className="new-emotion-label">Välj färg:</p>
        {/* This is where the user selects which color the emotion should have */}
        <div className="select-color-wrapper">
          <AddNewEmotionPickColor
            handleCheckbox={this.handleCheckbox}
            colors={colors}
          />
        </div>
      </div>
    );
  }
}

export default AddNewEmotionDialogue;
