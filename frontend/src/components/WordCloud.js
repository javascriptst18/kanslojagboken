import React from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';

class WordCloud2 extends React.Component {
  state = {
    words: [],
    emotions: [],
    fontsize: 0,
    colors: [],
  };

  async componentDidMount() {
    const { words, fontsize, emotions } = this.state;
    const result = await fetch(
      '/userdatabydate?id=5b912c3f272a825d807bd24f&datestart=20180702&dateend=20180830'
    );
    const response = await result.json();
    this.setState({ words: response });
    console.log('words: ', response);
    this.fetchColor();
  }

  // Den här metoden ska sätta rätt färg på respektive ord. Det betyder att den måste loopa igenom color-databasen och match mot orden som ligger i föregående metod?
  fetchColor = () => {
    const { colors } = this.state;
    fetch('/userdata?id=5b912c3f272a825d807bd24f')
      .then((response) => response.json())
      .then(() => {
        this.setState({ colors });
      });
    // console.log('fetchColor: ', colors);
  };

  render() {
    const { words, emotions, fontsize } = this.state;
    const finalArray = [];
    for (let i = 0; i < Object.keys(words).length; i += 1) {
      const array = Object.entries(words)[i];
      finalArray.push(array);
    }
    console.log(finalArray);
    // försöker göra om så att "text" blir key, alltså känslan, och att "value" blir värdet, alltså siffran.
    const newData = finalArray.map((item) => ({
      text: item[0],
      value: item[1],
    }));
    console.log(newData);
    return (
      <WordCloud
        data={newData}
        fontSizeMapper={fontSizeMapper}
        rotate={randomRotation}
        onWordClick={onClick}
      />
    );
  }
}

// What's happening when you click a word
function onWordClick() {
  console.log('Helluu');
}

// Randomizes the font size of the words, will not be necessary when the words will be adjusted after how many times they've been used.
const fontSizeMapper = (word) => Math.log2(word.value) * 20;
const onClick = (word) => onWordClick(word);
// Rotating words horizontally and vertically (in same direction)
const rotate = () => (Math.floor(Math.random() * 2) % 2 === 1 ? 90 : 0);
// Rotating words horizontally and vertical in two directions.
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
// const rotate = (word) => word.value % 360;

export default WordCloud2;

// Dependencies and documentation from https://www.npmjs.com/package/react-d3-cloud

// listanmedord.filter() if emotion.name is the same as, return emotion. Style=
