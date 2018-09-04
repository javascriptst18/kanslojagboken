import React from 'react';
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
    user: { name: 'Nathalie' },
    randomHelloPhrase: 'hur mår du idag?',
  };

  // Function for sorting the list of emotions when an emotion is selected/deselected
  handleChecked = (selected, incomingName) => {
    const { emotions } = this.state;
    if (selected) {
      const itemToMove = emotions.filter((item) => item.name === incomingName);
      const arrayWithoutItem = emotions.filter(
        (item) => item.name !== incomingName
      );
      arrayWithoutItem.unshift(itemToMove[0]);
      this.setState({ emotions: arrayWithoutItem });
    }
  };

  render() {
    const { emotions, user, randomHelloPhrase } = this.state; // destructuring state
    const emotionsOutput = emotions.map((item) => (
      <EmotionButton
        item={item}
        key={item.name}
        returnFunction={this.handleChecked}
      />
    ));
    return (
      <div className="start-screen">
        <h2>
          Hej
          {` ${user.name},`}
          <span>{randomHelloPhrase}</span>
        </h2>
        <div className="startscreen-emotion-list">{emotionsOutput}</div>
      </div>
    );
  }
}

export default StartScreen;
