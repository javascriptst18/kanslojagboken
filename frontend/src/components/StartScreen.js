import React from 'react';
import EmotionsOutput from './EmotionsOutput';
import AddNewEmotionDialogue from './AddNewEmotionDialogue';
import AddNewEmotionButtons from './AddNewEmotionButtons';
import EmotionFilters from './EmotionFilters';
import PickedByUserOutput from './PickedByUserOutput';
import NextButton from './NextButton';
import { postFetchData, patchFetchData } from './functions/fetchFunctions';
import './css/StartScreen.css';

// function for outputting the start screen of the app
class StartScreen extends React.Component {
  state = {
    // List of pickable emotions, populated from database on load
    emotions: [],
    // The colors we have to work with
    colors: [
      'red',
      'green',
      'blue',
      'orange',
      'yellow',
      'pink',
      'turquoise',
      'purple',
    ],
    // Where we store the emotions that the user picks
    pickedByUser: [],
    // A random hello phrase, fetched from the database later
    randomHelloPhrase: '',
    // Is the add new emotion dialogue open or closed?
    addNewEmotionOpen: false,
    // temporary storage for preview when creating new emotions
    newEmotionPreview: {
      name: '',
      color: '',
    },
    // is the filter menu open?
    filtersOpen: false,
    // if the user decides to filter by color, they will be saved in this array
    filterByColor: [],
  };

  // Code to be run when component loads for the first time
  async componentDidMount() {
    // add emotions to state
    const { emotions } = this.props;
    this.setState({ emotions });
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevProps.emotions!==this.props.emotions){
      const { emotions } = this.props;
    this.setState({ emotions });
    }
  }

  // Function for sorting the list of emotions when an emotion is selected/deselected (coming from the EmotionButton component)
  handleChecked = (selected, incomingName) => {
    const { pickedByUser, emotions } = this.state;
    // If the user has selected something...
    if (selected) {
      // Filter out what the user has selected from the list of emotions...
      const itemToMove = emotions.filter((item) => item.name === incomingName);
      // ...remove it from the original array...
      const arrayWithoutItem = emotions.filter(
        (item) => item.name !== incomingName
      );
      // ...and save the new states
      this.setState({
        emotions: arrayWithoutItem,
        pickedByUser: [...pickedByUser, itemToMove[0]],
      });
    } else {
      // if the user has deselected something previously selected, do the same as above but the other way around
      const itemToMove = pickedByUser.filter(
        (item) => item.name === incomingName
      );
      const arrayWithoutItem = pickedByUser.filter(
        (item) => item.name !== incomingName
      );
      this.setState({
        pickedByUser: arrayWithoutItem,
        emotions: [itemToMove[0], ...emotions],
      });
    }
  };

  // Function for opening Add New Emotion dialogue
  triggerAddNewEmotion = () => {
    const { addNewEmotionOpen } = this.state;
    if (addNewEmotionOpen) {
      this.setState({ addNewEmotionOpen: false });
    } else {
      this.setState({ addNewEmotionOpen: true });
    }
  };

  // Function for saving new emotions
   saveEmotion = async () => {
    const { newEmotionPreview, pickedByUser } = this.state;
    this.setState({
      pickedByUser: [...pickedByUser, newEmotionPreview], // select the preview object and add it to the pickedByUser array
      newEmotionPreview: {
        // empty the preview array
        name: '',
        color: '',
      },
      addNewEmotionOpen: false, // close the add new emotion dialogue...
      filtersOpen: false, // ...and the filters dialogue
    });
    let body={id:"5b912c3f272a825d807bd24f",data:newEmotionPreview}
    patchFetchData('/updateusercolor',body);
  };

  // Function for when the user decides not to save the previewed emotion
  skipSaveEmotion = () => {
    this.setState({
      newEmotionPreview: {
        // empty the preview object
        name: '',
        color: '',
      },
      addNewEmotionOpen: false, // close the dialogue...
      filtersOpen: false, // ...and the filters menu
    });
  };

  handlePreview = (text, incomingColor) => {
    // function for showing the preview of the new emotion about to be crated by the user
    this.setState({
      newEmotionPreview: {
        name: text,
        color: incomingColor,
      },
    });
  };

  handleCheckbox = (checked, incomingColor) => {
    // function for handling checkbox clicks in the filter dialogue
    const { filterByColor } = this.state;
    if (checked) {
      // if checked, add it to the filter array...
      this.setState({ filterByColor: [...filterByColor, incomingColor] });
    } else {
      // ... else remove it
      const removeFromFilter = filterByColor.filter(
        (item) => item !== incomingColor
      );
      this.setState({ filterByColor: removeFromFilter });
    }
  };

  // function for toggling the filters menu
  openFiltersCallback = () => {
    const { filtersOpen } = this.state;
    if (filtersOpen) {
      // if open, close it
      this.setState({ filtersOpen: false });
    } else {
      // else, open it
      this.setState({ filtersOpen: true });
    }
  };

  onSendDailyData = async (e) => {
    
    this.props.toggleMenu(e);
    const { pickedByUser } = this.state;
    const data = [...pickedByUser];

    const result = data.reduce((acc, item) => {
      acc.push(item.name);
      return acc;
    }, []);
    const body = { data: result, id: '5b912c3f272a825d807bd24f' };
    let response = await patchFetchData('/updateuserdata', body);
    if (response === 'error') {
      response = await postFetchData('/updateuserdata', body);
    }
    this.props.updateFreq()
    
  };

  render() {
    // destructuring state
    const {
      emotions,
      colors,
      pickedByUser,
      addNewEmotionOpen,
      newEmotionPreview,
      filtersOpen,
      filterByColor,
    } = this.state;
    let color="";
    const { randomHelloPhrase } = this.props;
    if(!pickedByUser.length){
      color={backgroundColor:"#ccc", animationDuration:"0s"};
    }
    return (
      <div className="start-screen">
        <div className="picked-emotions">
          <h2>
            Hej
            {` ${this.props.name},`}
            <span>{randomHelloPhrase}</span>
          </h2>
          {/* The list of emotions picked by the user */}
          <PickedByUserOutput
            pickedByUser={pickedByUser}
            handleChecked={this.handleChecked}
            newEmotionPreview={newEmotionPreview}
          />
        </div>

        {/* If add new emotion dialogue is open */}
        {addNewEmotionOpen ? (
          <React.Fragment>
            {/* Show the dialogue */}
            <AddNewEmotionDialogue previewFunction={this.handlePreview} />
            {/* Add save and abort buttons */}
            <AddNewEmotionButtons
              saveEmotion={this.saveEmotion}
              skipSaveEmotion={this.skipSaveEmotion}
              newEmotionPreview={newEmotionPreview}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* Show the filters */}
            <EmotionFilters
              colors={colors}
              filterByColor={filterByColor}
              handleCheckbox={this.handleCheckbox}
              filtersOpen={filtersOpen}
              openFiltersCallback={this.openFiltersCallback}
            />
            {/* Show the list of emotions available to the user */}
            <EmotionsOutput
              emotions={emotions}
              filterByColor={filterByColor}
              handleChecked={this.handleChecked}
            />

            <div className="add-emotion-button-wrapper">
              {/* Button for toggling the add new emotion dialogue */}
              <button
                type="button"
                className="add-emotion-button trigger-add"
                onClick={this.triggerAddNewEmotion}
              >
                <i className="fas fa-plus" />
                <span>Skapa ny</span>
              </button>
              {pickedByUser.length ?
              (<NextButton onClick={this.onSendDailyData} />)
              :
              (<NextButton color={color}/>)
            }
              
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default StartScreen;
