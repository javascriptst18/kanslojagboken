import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import 'normalize.css';
import './App.css';
import SplashScreen from './components/SplashScreen';
import StartScreen from './components/StartScreen';
import StatsScreen from './components/StatsScreen';
import Diary from './components/DiaryInput'
import CreateEmotions from './components/functions/CreateEmotions';
import { getFetch } from './components/functions/fetchFunctions';


class App extends React.Component {
  state = {
    emotions: [],
    splash: true,
    startScreen: false,
    statsScreen: false,
    diary:false,
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
    setTimeout(() => {
      // set a timeout on load for how the long the splash screen should be visible
      this.setState({
        splash: false,
        startScreen: true,
      });
    }, 2500);
    
    const data = await getFetch('./userdata?id=5b912c3f272a825d807bd24f');

    this.setState({ userData: data }, async () => {
      const { userData } = this.state;
      // run function for setting up the start screen emotions
      const createdEmotions = CreateEmotions(userData.colors);
      this.setState({ emotions: createdEmotions });
    });

    
    const randomHello = await getFetch('./hello');
    this.setState({ hello: randomHello[0] });
    const now = new Date();
    const year = now.getFullYear().toString();
  
   let month = (now.getMonth() + 1).toString();
   if (month < 10) {
     month = `0${month}`;
   }
   const day = now.getDate().toString();
   const startDate = year +"0" + (month-1) + day;
   const endDate = year + month + day;
   console.log(startDate + " " + endDate);
    
    const freqData = await getFetch(
    `/userdatabydatewithcolor?id=5b912c3f272a825d807bd24f&datestart=${startDate}&dateend=${endDate}`
    );
    this.setState({ freqData });
    
  }

  toggleMenu = (e) => {
    
    if(e){
      if (e.target.dataset.menuitem === 'start') {
        this.setState({
          startScreen: true,
          statsScreen: false,
          dairy:false
        });
      }else if (e.target.dataset.menuitem === 'stats') {
          this.setState({
            startScreen: false,
            statsScreen: true,
            dairy:false,
          }); 
      
    } else if(e.target.name==="moveOn"){
      this.setState({
        startScreen: false,
        statsScreen: false,
        diary:true
      });
    }
  }else{
    this.setState({
      startScreen: false,
      statsScreen: true,
      diary:false
    });
  }
  }
  render() {
    const {
      splash,
      startScreen,
      statsScreen,
      diary,
      emotions,
      userData,
      hello,
      freqData,
    } = this.state;
    let whatToRender = '';
    if (splash) {
      whatToRender = <SplashScreen key="splashScreen" />;
    } else if (startScreen) {
      whatToRender = (
        <div className="page-wrapper">
          <div className="App">
            <StartScreen key="startScreen" emotions={emotions} name={userData.name} randomHelloPhrase={hello} toggleMenu={this.toggleMenu}/>
          </div>
        </div>
      );
    } else if(diary){
      whatToRender = (
      <div className="page-wrapper">
          <div className="App">
            <Diary key="diary" toggleMenu={this.toggleMenu}/>
          </div>
        </div>
      )
    }else {
      whatToRender = (
        <div className="page-wrapper">
          <div className="App">
            <StatsScreen key="statsScreen" emotions={emotions} freqData={freqData} />
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
