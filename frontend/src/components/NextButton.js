import React from 'react';
import './css/NextButton.css';

function NextButton(props) {
  const { onClick } = props;
  return (
    <button className="next-button" type="submit" onClick={onClick}>
      Gå vidare
      <i className="fa fa-arrow-right next-button-arrow" aria-hidden="true" />
    </button>
  );
}

export default NextButton;
