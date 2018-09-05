import React from 'react';
import FlipMove from 'react-flip-move';
import EmotionButton from './EmotionButton';
import './css/StartScreen.css';

class StartScreen extends React.Component {
  state = {
    emotions: [
      {
        name: 'Arg',
        color: 'red',
      },
      {
        name: 'Glad',
        color: 'green',
      },
      {
        name: 'Nedstämd',
        color: 'blue',
      },
      {
        name: 'Harmonisk',
        color: 'orange',
      },
      {
        name: 'Sprallig',
        color: 'yellow',
      },
      {
        name: 'Kärleksfylld',
        color: 'pink',
      },
      {
        name: 'Orolig',
        color: 'turquoise',
      },
      {
        name: 'Stressad',
        color: 'purple',
      },
    ],
    pickedByUser: [],
    user: { name: 'Nathalie' },
    randomHelloPhrase: 'hur mår du idag?',
  };

  // Function for sorting the list of emotions when an emotion is selected/deselected
  handleChecked = (selected, incomingName) => {
    const { emotions, pickedByUser } = this.state;
    if (selected) {
      const itemToMove = emotions.filter((item) => item.name === incomingName);
      const arrayWithoutItem = emotions.filter(
        (item) => item.name !== incomingName
      );
      this.setState({
        emotions: arrayWithoutItem,
        pickedByUser: [...pickedByUser, itemToMove[0]],
      });
    } else {
      const itemToMove = pickedByUser.filter(
        (item) => item.name === incomingName
      );
      const arrayWithoutItem = pickedByUser.filter(
        (item) => item.name !== incomingName
      );
      this.setState({
        pickedByUser: arrayWithoutItem,
        emotions: [itemToMove[0], ...emotions],
      });
    }
  };

  render() {
    const { emotions, user, randomHelloPhrase, pickedByUser } = this.state; // destructuring state
    let pickedByUserOutput = '';
    if (pickedByUser.length > 0) {
      pickedByUserOutput = pickedByUser.map((item) => (
        <EmotionButton
          item={item}
          key={item.name}
          returnFunction={this.handleChecked}
          selected
        />
      ));
    }
    const emotionsOutput = emotions.map((item) => (
      <EmotionButton
        item={item}
        key={item.name}
        returnFunction={this.handleChecked}
      />
    ));
    return (
      <div className="start-screen">
        <div className="picked-emotions">
          <h2>
            Hej
            {` ${user.name},`}
            <span>{randomHelloPhrase}</span>
          </h2>
          {pickedByUserOutput.length > 0 && (
            <FlipMove duration={500} staggerDurationBy={20}>
              {pickedByUserOutput}
            </FlipMove>
          )}
        </div>
        <div className="emotion-list">
          <FlipMove duration={500} staggerDurationBy={20}>
            {emotionsOutput}
          </FlipMove>
        </div>
      </div>
    );
  }
}

export default StartScreen;
