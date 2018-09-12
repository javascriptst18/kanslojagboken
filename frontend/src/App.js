import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import 'normalize.css';
import './App.css';
import SplashScreen from './components/SplashScreen';
import StartScreen from './components/StartScreen';
import StatsScreen from './components/StatsScreen';
import CreateEmotions from './components/functions/CreateEmotions';
import { getFetch } from './components/functions/fetchFunctions';

class App extends React.Component {
  state = {
    emotions: [],
    splash: true,
    startScreen: false,
    statsScreen: false,
    hello: '',
  };

  async componentDidMount() {
    // Code to be run when component loads for the first time

    const randomHello = await getFetch('./hello');

    this.setState({ hello: randomHello[0] });

    const data = await getFetch('./userdata?id=5b912c3f272a825d807bd24f');

    this.setState({ userData: data }, async () => {
      const { userData } = this.state;

      // run function for setting up the start screen emotions
      const createdEmotions = CreateEmotions(userData.colors);

      this.setState({ emotions: createdEmotions });
    });
    setTimeout(() => {
      // set a timeout on load for how the long the splash screen should be visible
      this.setState({
        splash: false,
        startScreen: true,
      });
    }, 1300);
  }

  toggleMenu = (e) => {
    if (e.target.dataset.menuitem === 'start') {
      this.setState({
        startScreen: true,
        statsScreen: false,
      });
    } else {
      this.setState({
        startScreen: false,
        statsScreen: true,
      });
    }
  };

  render() {
    const {
      splash,
      startScreen,
      statsScreen,
      emotions,
      userData,
      hello,
    } = this.state;
    let whatToRender = '';
    if (splash) {
      whatToRender = <SplashScreen key="splashScreen" />;
    } else if (startScreen) {
      whatToRender = (
        <div className="page-wrapper">
          <div className="App">
            <StartScreen
              key="startScreen"
              emotions={emotions}
              name={userData.name}
              randomHelloPhrase={hello}
            />
          </div>
        </div>
      );
    } else {
      whatToRender = (
        <div className="page-wrapper">
          <div className="App">
            <StatsScreen key="statsScreen" emotions={emotions} />
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        {!splash && (
          <nav className="top-menu">
            <button
              type="button"
              className={`menu-button${startScreen ? ' current-page' : ''}`}
              data-menuitem="start"
              onClick={this.toggleMenu}
            >
              Skriv i Jagboken
            </button>
            <button
              type="button"
              className={`menu-button${statsScreen ? ' current-page' : ''}`}
              data-menuitem="stats"
              onClick={this.toggleMenu}
            >
              Överblick
            </button>
          </nav>
        )}
        <ReactCSSTransitionReplace
          transitionName="cross-fade"
          transitionEnterTimeout={800}
          transitionLeaveTimeout={800}
        >
          {whatToRender}
        </ReactCSSTransitionReplace>
      </React.Fragment>
    );
  }
}

export default App;
