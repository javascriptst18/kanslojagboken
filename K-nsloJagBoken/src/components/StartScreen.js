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
    ],
    selected: [],
    user: {name:'Nathalie',}
  };

  render() {
    const { emotions, user } = this.state;
    const emotionsOutput = emotions.map((item, i) => (
      <EmotionButton item={item} key={i} />
    ));
    return (
      <div className="start-screen">
        <h2>Hej {user.name}, <span>hur mår du idag?</span></h2>
        <div className="startscreen-emotion-list">{emotionsOutput}</div>
      </div>
    );
  }
}

export default StartScreen;
