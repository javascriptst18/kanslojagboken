import React from 'react';
import './css/NextButton.css';

function NextButton(props) {
  const { onClick } = props;
  return (
    <div>
      <button className="next-button" type="submit" onClick={onClick}>
        Gå vidare
        <i className="fa fa-arrow-right next-button-arrow" aria-hidden="true" />
      </button>
    </div>
  );
}

export default NextButton;
