import React from 'react';
import {NextButton} from "./NextButton";

//Input where user can enter a post for the day if they want to
class DiaryInput extends React.Component {
  state = {
    diary: '',
  };

  onChange = () => {
    this.setState({ diary: event.target.value });
  };

  saveDiary = () => {
    event.preventDefault();
    fetch('/savediary', {
      method: 'POST',
      // credentials: "same-origin",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.diary),,
    })
      .then((response) => response.json())
      .then((clear) => {
        this.setState({ diary: '' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="diary-input-container">
        <form>
          <label htmlFor="diary">Enter a journal post</label>
          <input
            className="diary-input"
            name="diary"
            type="text"
            placeholder="Vill du tillägga något?"
            onChange={this.onChange}
            value={this.state.diary}
          />
          <NextButton onClick={this.saveDiary} />
        </form>
      </div>
    );
  }
}

export default DiaryInput;
