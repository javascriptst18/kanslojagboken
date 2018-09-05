import React from 'react';
import FlipMove from 'react-flip-move';
import EmotionButton from './EmotionButton';
import AddNewEmotionDialogue from './AddNewEmotionDialogue';
import './css/StartScreen.css';

class StartScreen extends React.Component {
  state = {
    // List of pickable emotions, hard coded now, will be fetched from database later
    emotions: [
      {
        name: 'Arg',
        color: 'red',
      },
      {
        name: 'Glad',
        color: 'green',
      },
      {
        name: 'Nedstämd',
        color: 'blue',
      },
      {
        name: 'Harmonisk',
        color: 'orange',
      },
      {
        name: 'Sprallig',
        color: 'yellow',
      },
      {
        name: 'Kärleksfylld',
        color: 'pink',
      },
      {
        name: 'Orolig',
        color: 'turquoise',
      },
      {
        name: 'Stressad',
        color: 'purple',
      },
    ],
    // Where we store the emotions that the user picks
    pickedByUser: [],
    // Users details
    user: { name: 'Nathalie' },
    // A random hello phrase, fetched from the database later
    randomHelloPhrase: 'hur mår du idag?',
    addNewEmotionOpen: false,
    newEmotionPreview: {
      name: '',
      color: '',
    },
  };

  // Function for sorting the list of emotions when an emotion is selected/deselected (coming from the EmotionButton component)
  handleChecked = (selected, incomingName) => {
    const { emotions, pickedByUser } = this.state;
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

  saveEmotion = () => {
    const { newEmotionPreview, pickedByUser } = this.state;
    this.setState({
      pickedByUser: [...pickedByUser, newEmotionPreview],
      newEmotionPreview: {
        name: '',
        color: '',
      },
      addNewEmotionOpen: false,
    });
  };

  skipSaveEmotion = () => {
    this.setState({
      newEmotionPreview: {
        name: '',
        color: '',
      },
      addNewEmotionOpen: false,
    });
  };

  handlePreview = (text, incomingColor) => {
    this.setState({
      newEmotionPreview: {
        name: text,
        color: incomingColor,
      },
    });
  };

  render() {
    // destructuring state
    const {
      emotions,
      user,
      randomHelloPhrase,
      pickedByUser,
      addNewEmotionOpen,
      newEmotionPreview,
    } = this.state;

    let pickedByUserOutput = '';
    if (pickedByUser.length > 0) {
      // If the user has picked something, add the emotion buttons to the picked container
      pickedByUserOutput = pickedByUser.map((item) => (
        <EmotionButton
          item={item}
          key={item.name}
          returnFunction={this.handleChecked}
          selected
        />
      ));
    }
    // create emotion buttons from all alternatives available in emotions state
    const emotionsOutput = emotions.map((item) => (
      <EmotionButton
        item={item}
        key={item.name}
        returnFunction={this.handleChecked}
      />
    ));
    return (
      <div className="start-screen">
        <div className="picked-emotions">
          <h2>
            Hej
            {` ${user.name},`}
            <span>{randomHelloPhrase}</span>
          </h2>
          {(pickedByUserOutput.length > 0 || newEmotionPreview.name !== '') && (
            <div className="picked-emotions-inner">
              {pickedByUserOutput.length > 0 && (
                <FlipMove duration={500} staggerDurationBy={20}>
                  {pickedByUserOutput}
                </FlipMove>
              )}
              {newEmotionPreview.name !== '' && (
                <button
                  type="button"
                  className={`emotion-list-item ${
                    newEmotionPreview.color
                  } selected`}
                >
                  {newEmotionPreview.name}
                </button>
              )}
            </div>
          )}
        </div>

        {addNewEmotionOpen ? (
          <React.Fragment>
            <AddNewEmotionDialogue previewFunction={this.handlePreview} />
            <button
              type="button"
              className="add-emotion-button add"
              onClick={this.saveEmotion}
            >
              <i className="far fa-save" />
              <span>Spara</span>
            </button>
            <button
              type="button"
              className="add-emotion-button skip"
              onClick={this.skipSaveEmotion}
            >
              <i className="fas fa-ban" />
              <span>Avbryt</span>
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="emotion-list">
              <FlipMove duration={500} staggerDurationBy={20}>
                {emotionsOutput}
              </FlipMove>
            </div>
            <button
              type="button"
              className="add-emotion-button add"
              onClick={this.triggerAddNewEmotion}
            >
              <i className="fas fa-plus" />
              <span>Skapa ny</span>
            </button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default StartScreen;
