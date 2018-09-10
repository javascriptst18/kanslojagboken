import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import 'normalize.css';
import './App.css';
import SplashScreen from './components/SplashScreen';
import StartScreen from './components/StartScreen';
import WordCloud2 from './components/WordCloud';
import ColorGradientStats from './components/stats/ColorGradientStats';
import CreateEmotions from './components/CreateEmotions';
import { getFetch } from './components/functions/fetchFunctions';

class App extends React.Component {
  state = {
    emotions: [],
    splash: true,
    colorGradientOpen: false,
  };

  async componentDidMount() {
    // Code to be run when component loads for the first time
    const data = await getFetch('./userdata?id=5b912c3f272a825d807bd24f');
    console.log(data);
    this.setState({ userData: data }, () => {
      const { userData } = this.state;
      // run function for setting up the start screen emotions
      const createdEmotions = CreateEmotions(userData.colors);
      // add emotions to state

      this.setState({ emotions: createdEmotions });
    });
    setTimeout(() => {
      // set a timeout on load for how the long the splash screen should be visible
      this.setState({ splash: false });
    }, 1300);
  }

  render() {
    const { splash, colorGradientOpen, emotions } = this.state;
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
              name={this.state.userData.name}
            />
            <WordCloud2 />
          </div>
        )}
      </ReactCSSTransitionReplace>
    );
  }
}

export default App;
