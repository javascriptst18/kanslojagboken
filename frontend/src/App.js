import React from 'react';
import 'normalize.css';
import './App.css';
import StartScreen from './components/StartScreen';
import WordCloud from './components/WordCloud';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <StartScreen />
        <WordCloud />
      </div>
    );
  }
}

export default App;
