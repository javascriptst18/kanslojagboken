import React from 'react';

function NextButton(props) {
  const { onClick } = props;
  return (
    <div>
      <button className="next-button" type="submit" onClick={onClick}>
        Klicka här
        <i className="fa fa-arrow-right next-button-arrow" aria-hidden="true" />
      </button>
    </div>
  );
}

export default NextButton;
