import React from 'react';
import { DiaryInput } from './DiaryInput';

function NextButton(props) {
  return (
    <div>
      <button type="submit" className="next-button" onClick={props.onClick} />
      {/* //En cool knapp kanske */}
    </div>
  );
}

export default NextButton;
