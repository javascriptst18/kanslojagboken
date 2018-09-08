import React from 'react';
import FlipMove from 'react-flip-move';
import EmotionButton from './EmotionButton';

// function for outputting the emotions the user has picked
function PickedByUserOutput(props) {
  const { pickedByUser, handleChecked, newEmotionPreview } = props;
  // set up filters
  let pickedByUserOutput = '';
  if (pickedByUser.length > 0) {
    // If the user has picked something, add the emotion buttons to the picked container
    pickedByUserOutput = pickedByUser.map((item) => (
      <EmotionButton
        item={item}
        key={item.name}
        returnFunction={handleChecked}
        selected
      />
    ));
  }
  return (
    (pickedByUserOutput.length > 0 || newEmotionPreview.name !== '') && (
      <div className="picked-emotions-inner">
        {pickedByUserOutput.length > 0 && (
          <FlipMove duration={500} staggerDurationBy={20}>
            {pickedByUserOutput}
          </FlipMove>
        )}
        {newEmotionPreview.name !== '' && (
          <button
            type="button"
            className={`emotion-list-item ${newEmotionPreview.color} selected`}
          >
            {newEmotionPreview.name}
          </button>
        )}
      </div>
    )
  );
}

export default PickedByUserOutput;
