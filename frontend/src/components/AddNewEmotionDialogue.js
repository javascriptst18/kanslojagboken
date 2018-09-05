import React from 'react';
import AddNewEmotionPickColor from './AddNewEmotionPickColor';
import './css/AddNewEmotionDialogue.css';

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

  handleChange = (e) => {
    const { previewFunction } = this.props;
    this.setState({ inputText: e.target.value }, () => {
      const { inputText, selectedColor } = this.state;
      previewFunction(inputText, selectedColor);
    });
  };

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
          <input
            type="text"
            name="new-emotion"
            id="new-emotion"
            value={inputText}
            onChange={this.handleChange}
          />
        </label>
        <p className="new-emotion-label">Välj färg:</p>
        <AddNewEmotionPickColor
          handleCheckbox={this.handleCheckbox}
          colors={colors}
        />
      </div>
    );
  }
}

export default AddNewEmotionDialogue;
