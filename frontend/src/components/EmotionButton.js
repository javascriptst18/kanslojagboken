import React from 'react';
import './css/EmotionButton.css';

class EmotionButton extends React.Component {
  state = {
    selected: false,
  };

  handleClick = () => {
    const { selected } = this.state;
    const { returnFunction, item } = this.props;
    if (selected) {
      this.setState({ selected: false });
    } else {
      this.setState({ selected: true });
    }
    returnFunction(selected, item.name);
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
