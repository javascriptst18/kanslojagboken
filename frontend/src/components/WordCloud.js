import React from 'react';
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';

class WordCloud2 extends React.Component {
  state = {
    words: [],
    emotions: {},
  };

  componentDidMount() {
    this.fetchWords();
  }

  fetchWords = () => {
    const { words, emotions } = this.state;
    fetch('http://localhost:4000/userdata?id=5b912c3f272a825d807bd24f', {
      method: 'GET',
      // credentials: "same-origin"
    })
      .then((response) => response.json())
      .then(console.log(words))
      .then((words) => {
        this.setState({ words });
        return words;
      })
      // looping through the list to find out how many times a word has been used
      .then((words) =>
        words.forEach((e) =>
          e.emotions.forEach((d) => {
            this.setState((state) => {
              const currentWordCount = state.emotions[d];
              if (currentWordCount) {
                return {
                  emotions: {
                    [d]: currentWordCount + 1,
                  },
                };
              }
              return {
                emotions: {
                  [d]: 1,
                },
              };
            });
          })
        )
      )

      .then(console.log(emotions, words))
      .catch((error) => {
        console.log("This didn't work", error);
      });
  };

  generatingFontSize = () => {
    const { words } = this.state;
    words.map((word) => Math.log2(word.value) * 5);
  };

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
