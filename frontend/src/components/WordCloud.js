import React from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';

class WordCloud2 extends React.Component {
  render() {
    return (
      <WordCloud
        data={data}
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
const fontSizeMapper = (word) => Math.log2(word.value) * 5;
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
