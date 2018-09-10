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
      this.setState({ splash: false });
    }, 500);

    let data = await fetch('/userdata?id=5b912c3f272a825d807bd24f');
    data = await data.json();
    console.log(data);
    /*
    let data2 = await this.patchFetchData('/posttestdata', {
      id: '5b912c3f272a825d807bd24f',
      data: ['hello', 'yes', 'new', 'more'],
    });
    data2 = await data2.json();
    console.log(data2);
    */
    /*
    for (let i = 0; i < 500; i++) {
      let data4 = await fetch('/posttestdata');
      data4 = await data4.json();
      console.log(data4);
    }
*/

    let data4 = await fetch(
      '/userdatabydate?id=5b912c3f272a825d807bd24f&datestart=20180122&dateend=20180403'
    );
    data4 = await data4.json();
    console.log(data4);
  }

  patchFetchData = async (url, post) => {
    try {
      return fetch(url, {
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
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
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
