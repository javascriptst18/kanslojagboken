import React from 'react';
import { NextButton } from './NextButton';

// Input where user can enter a post for the day if they want to
class DiaryInput extends React.Component {
  state = {
    diary: '',
  };

  onChange = (event) => {
    this.setState({ diary: event.target.value });
  };

  saveDiary = (event) => {
    const { diary } = this.state;
    event.preventDefault();
    fetch('/savediary', {
      method: 'POST',
      // credentials: "same-origin",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ diary }),
    })
      .then((response) => response.json())
      .then(() => {
        this.setState({ diary: '' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { diary } = this.state;
    return (
      <div className="diary-input-container">
        <form>
          <label htmlFor="diary-input">
            Enter a journal post
            <input
              className="diary-input"
              name="diary-input"
              id="diary-input"
              type="text"
              placeholder="Vill du tillägga något?"
              onChange={this.onChange}
              value={diary}
            />
          </label>
          <NextButton onClick={this.saveDiary} />
        </form>
      </div>
    );
  }
}

export default DiaryInput;
