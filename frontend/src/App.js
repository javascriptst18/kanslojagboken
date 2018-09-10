import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import 'normalize.css';
import './App.css';
import SplashScreen from './components/SplashScreen';
import StartScreen from './components/StartScreen';

class App extends React.Component {
  state = {
    splash: true,
  };

  async componentDidMount() {
    setTimeout(() => {
      // set a timeout on load for how the long the splash screen should be visible
      this.setState({ splash: false });
    }, 1300);
  }

  render() {
    const { splash } = this.state;
    return (
      <ReactCSSTransitionReplace
        transitionName="cross-fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={800}
      >
        {splash ? (
          <SplashScreen key="splashScreen" />
        ) : (
          <div className="App">
            <StartScreen key="startScreen" />
          </div>
        )}
      </ReactCSSTransitionReplace>
    );
  }
}

export default App;
