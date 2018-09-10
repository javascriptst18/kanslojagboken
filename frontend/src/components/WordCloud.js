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
    this.generatingFontSize();
    this.fetchColor();
    this.fetchEmotions();
  }

  fetchEmotions = () => {
    const { words } = this.state;
    const emotions = Object.keys(words);
    console.log('fetchEmotions: ', emotions);
    this.setState({ emotions });
  };

  // I den här metoden ska font size genereras utefter antal gånger varje ord använts. Tanken är att den ska loopa igenom varje ord, hitta dens siffra och multiplicera med 5 så får den denna font size.
  // Sätt en max-gräns också.
  generatingFontSize = () => {
    const { words, fontsize } = this.state;
    const values = Object.values(words);
    console.log('generatingFontSize: ', values);
    const results = values.map((word) => Math.log2(word) * 500);
    this.setState({ fontsize: results });
  };

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
    // console.log(finalArray);
    // försöker göra om så att "text" blir key, alltså känslan, och att "value" blir värdet, alltså siffran.
    const newData = finalArray.map((item) => ({
      text: item,
      value: Math.random() * 2000,
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

// Dummy data for word cloud
const data = [
  { text: 'Hey', value: 1000 },
  { text: 'lol', value: 200 },
  { text: 'first impression', value: 800 },
  { text: 'very cool', value: 1000000 },
  { text: 'duck', value: 10 },
  { text: 'Hey', value: 1000 },
  { text: 'lol', value: 200 },
  { text: 'first impression', value: 800 },
  { text: 'very cool', value: 1000000 },
  { text: 'duck', value: 10 },
  { text: 'Hey', value: 1000 },
  { text: 'lol', value: 200 },
  { text: 'first impression', value: 800 },
  { text: 'very cool', value: 1000000 },
  { text: 'duck', value: 10 },
  { text: 'Hey', value: 1000 },
  { text: 'lol', value: 200 },
  { text: 'first impression', value: 800 },
  { text: 'very cool', value: 1000000 },
  { text: 'duck', value: 10 },
];

// What's happening when you click a word
function onWordClick() {
  console.log('Helluu');
}

// Randomizes the font size of the words, will not be necessary when the words will be adjusted after how many times they've been used.
const fontSizeMapper = (word) => Math.log2(word.value) * 10;
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
