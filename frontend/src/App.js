import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import 'normalize.css';
import './App.css';
import SplashScreen from './components/SplashScreen';
import StartScreen from './components/StartScreen';
import ColorGradientStats from './components/stats/ColorGradientStats';
import CreateEmotions from './components/functions/CreateEmotions';
import { getFetch } from './components/functions/fetchFunctions';

class App extends React.Component {
  state = {
    emotions: [],
    splash: true,
    colorGradientOpen: false,
    hello: '',
    firstVisitToday: true,
    userData: '',
  };

  async componentWillMount() {
    const visited = await localStorage.getItem('visitToday');
    const date = new Date().setHours(0, 0, 0, 0).toString();
    if (visited === date) {
      this.setState({ firstVisitToday: false });
    } else {
      localStorage.setItem('visitToday', date);
    }
  }

  async componentDidMount() {
    // Code to be run when component loads for the first time

    const randomHello = await getFetch('./hello');
    console.log(randomHello);
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
      this.setState({ splash: false });
    }, 1300);
  }

  render() {
    const { splash, colorGradientOpen, emotions, hello, userData } = this.state;
    if (colorGradientOpen) {
      return <ColorGradientStats />;
    }
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
            <StartScreen
              key="startScreen"
              emotions={emotions}
              name={userData.name}
              randomHelloPhrase={hello}
            />
          </div>
        )}
      </ReactCSSTransitionReplace>
    );
  }
}

export default App;
