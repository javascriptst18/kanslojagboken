import React from 'react';

// Function for creating the save and abort button in the add new emotion dialogue
function AddNewEmotionButtons(props) {
  const { skipSaveEmotion, saveEmotion, newEmotionPreview } = props;
  return (
    // Abort button
    <div className="add-emotion-button-wrapper">
      <button
        type="button"
        className="add-emotion-button skip"
        onClick={skipSaveEmotion}
      >
        <i className="fas fa-ban" />
        <span>Avbryt</span>
      </button>
      {/* Save button */}
      <button
        type="button"
        className="add-emotion-button add"
        onClick={saveEmotion}
        disabled={
          newEmotionPreview.name === '' || newEmotionPreview.color === ''
        }
      >
        <i className="far fa-save" />
        <span>Spara</span>
      </button>
      {/* Error message to show if both fields are not picked */}
      <div className="add-emotion-error">
        <p>
          Du måste skriva in en känsla och välja en färg för att kunna spara
        </p>
      </div>
    </div>
  );
}

export default AddNewEmotionButtons;
