import React from 'react';
import './css/EmotionButton.css';

// function for outputting each emotion button
class EmotionButton extends React.Component {
  state = {
    selected: false,
  };

  // When component sets up
  componentDidMount() {
    const { selected } = this.props;
    // if we have set "selected" as a prop, set the state as selected
    if (selected) {
      this.setState({ selected: true });
    }
  }

  // Function for handling click on the emotion button
  handleClick = () => {
    const { selected } = this.state;
    const { returnFunction, item } = this.props;
    // set the state and then run the return function inside StartScreen component
    if (selected) {
      this.setState({ selected: false });
      returnFunction(false, item.name);
    } else {
      this.setState({ selected: true }, () => {
        returnFunction(true, item.name);
      });
    }
  };

  render() {
    const { item } = this.props;
    const { selected } = this.state;
    return (
      <button
        type="button"
        className={`emotion-list-item ${item.color}${
          selected ? ' selected' : ''
        }`}
        onClick={this.handleClick}
      >
        {item.name}
        {selected ? (
          <i className="far fa-check-circle" />
        ) : (
          <i className="far fa-circle" />
        )}
      </button>
    );
  }
}

export default EmotionButton;
