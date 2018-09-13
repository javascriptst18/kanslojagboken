import React from 'react';

// import WordCloud from 'react-d3-cloud';
import WordCloud from './TheWordCloudBase';

class WordCloud2 extends React.Component {
  state = {
    emotions: [],
    emotionsHighestValue: '',
  };

  componentDidMount() {
    const { freqData } = this.props;
    this.setState(
      {
        emotions: freqData,
      },
      () => {
        const { emotions } = this.state;
        const values = Object.keys(emotions).map((key) => emotions[key][0]);
        const maxValue = Math.max(...values);
        this.setState({ emotionsHighestValue: maxValue });
      }
    );
  }

  // What happens when you click a word
  onWordClick = () => {
    console.log('helluuu');
  };

  // Rotating emotions horizontally and vertical in two directions.
  randomRotation = () => {
    const randomValue = Math.floor(Math.random() * 3);
    switch (randomValue) {
      case 0:
        return 0;
      case 1:
        return 90;
      case 2:
        return 270;
      default:
        console.error('incorrect random value generated');
        return 0;
    }
  };

  render() {
    const { emotions, emotionsHighestValue } = this.state;
    // making the Emotions-object to an array
    const newWordsArray = Object.entries(emotions);
    let hexColor = '';
    const newData = newWordsArray.map((item) => {
      switch (item[1][1]) {
        case 'red':
          hexColor = '#b51316';
          break;

        case 'orange':
          hexColor = '#e2701a';
          break;

        case 'yellow':
          hexColor = '#f9e41c';
          break;

        case 'green':
          hexColor = '#017f43';
          break;

        case 'turquoise':
          hexColor = '#008988';
          break;

        case 'blue':
          hexColor = '#081b64';
          break;

        case 'purple':
          hexColor = '#6a005a';
          break;

        case 'pink':
          hexColor = '#e44097';
          break;

        default:
          return null;
      }
      return {
        text: item[0],
        value: item[1][0],
        color: hexColor,
      };
    });

    // Mapping through the new array to make a property of each value

    // Calculating the percentage font size of the words based on frequency
    const fontSizeMapper = (word) => (word.value / emotionsHighestValue) * 100;
    // OnWordClick is applied to every word
    const onClick = (word) => this.onWordClick(word);
    return (
      <WordCloud
        width={510}
        height={510}
        padding={4}
        font="Source Sans Pro"
        data={newData}
        fontSizeMapper={fontSizeMapper}
        rotate={this.randomRotation}
        onClick={this.onWordClick}
      />
    );
  }
}

// Rotating emotions horizontally and vertically (in same direction)
// const rotate = () => (Math.floor(Math.random() * 2) % 2 === 1 ? 90 : 0);

export default WordCloud2;

// Dependencies and documentation from https://www.npmjs.com/package/react-d3-cloud
