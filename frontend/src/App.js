import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import 'normalize.css';
import './App.css';
import SplashScreen from './components/SplashScreen';
import StartScreen from './components/StartScreen';
import WordCloud from './components/WordCloud';

class App extends React.Component {
  state = {
    splash: true,
  };

  async componentDidMount() {
    setTimeout(() => {
      this.setState({ splash: false });
    }, 500);
  }

  patchFetchData = async (url, post) => {
    try {
      return await fetch(url, {
        method: 'POST',

        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return error;
    }
  };

  render() {
    const { splash } = this.state;
    return (
      <ReactCSSTransitionReplace
        transitionName="cross-fade"
        transitionEnterTimeout={600}
        transitionLeaveTimeout={600}
      >
        {splash ? (
          <SplashScreen key="splashScreen" />
        ) : (
          <div className="App">
            <StartScreen key="startScreen" />
            <WordCloud />
          </div>
        )}
      </ReactCSSTransitionReplace>
    );
  }
}

export default App;
