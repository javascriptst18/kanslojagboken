function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

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
  const shuffledArray = shuffle(flattenedArray);

  // ... and return it
  return shuffledArray;
}

export default CreateEmotions;
