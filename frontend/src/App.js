import React from 'react';
import 'normalize.css';
import './App.css';
import StartScreen from './components/StartScreen';

class App extends React.Component {
  async componentDidMount() {
    let data = await fetch('/userdata?id=5b912c3f272a825d807bd24f');
    data = await data.json();
    console.log(data);

    let data2 = await this.patchFetchData('/updateuserdata', {
      id: '5b912c3f272a825d807bd24f',
      data: ['hello', 'yes', 'new'],
    });
    data2 = await data2.json();
    console.log(data2);
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
    return (
      <div className="App">
        <StartScreen />
      </div>
    );
  }
}

export default App;
