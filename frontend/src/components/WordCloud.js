import React from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';

class WordCloud2 extends React.Component {
  state = {
    emotions: [],
  };

  async componentDidMount() {
    const result = await fetch(
      '/userdatabydatewithcolor?id=5b912c3f272a825d807bd24f&datestart=20180702&dateend=20180830'
    );
    const response = await result.json();
    this.setState({
      emotions: response,
    });
    console.log('emotions: ', response);
  }

  onWordClick = () => {
    console.log('helluuu');
  };

  render() {
    const { emotions } = this.state;
    // making the Emotions-object to an array
    const newWordsArray = Object.entries(emotions);
    // Mapping through the new array to make a property of each value
    const newData = newWordsArray.map((item) => ({
      text: item[0],
      value: item[1][0],
      color: item[1][1],
    }));
    console.log('newData: ', newData);
    // Calculating the font size of the words based on frequency
    const fontSizeMapper = (word) => Math.log2(word.value) * 20;
    return (
      <WordCloud
        width={1000}
        height={750}
        padding={4}
        font={'sans-serif'}
        data={newData}
        fontSizeMapper={fontSizeMapper}
        rotate={randomRotation}
        onWordClick={onClick}
        fill={'blue'}
      />
    );
  }
}

// What's happening when you click a word
function onWordClick() {
  console.log('Helluu');
}

const onClick = (word) => onWordClick(word);
// Rotating emotions horizontally and vertically (in same direction)
const rotate = () => (Math.floor(Math.random() * 2) % 2 === 1 ? 90 : 0);
// Rotating emotio horizontally and vertical in two directions.
const randomRotation = () => {
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

export default WordCloud2;

// Dependencies and documentation from https://www.npmjs.com/package/react-d3-cloud

// listanmedord.filter() if emotion.name is the same as, return emotion. Style=
