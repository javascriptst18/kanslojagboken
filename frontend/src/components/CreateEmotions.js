import React from 'react';

// function for generating the user's emotion buttons
function CreateEmotions(colors) {
  // map the colors
  const mappedColors = colors.map((color) => {
    // get the color from the object key
    const key = Object.keys(color);
    // map each color and create the emotion object
    const wordObject = color[key[0]].map((word) => ({
      name: word,
      color: key[0],
    }));
    // return the emotion object
    return wordObject;
  });
  // flatten the array of arrays...
  const flattenedArray = mappedColors.reduce((a, b) => a.concat(b), []);
  // ... and return it
  return flattenedArray;
}

export default CreateEmotions;
