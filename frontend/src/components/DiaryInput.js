import React from 'react';
import './css/DiaryInput.css';
import NextButton from './NextButton';

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
    // Detta är bara en placeholder för vilken route vi nu kommer ha till databasen
    fetch('/savediary', {
      method: 'POST',
      // credentials: "same-origin",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ diary }),
    })
      .then((response) => response.json())
      .then(() => {
        this.setState({ diary: '' });
        console.log('success!');
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
          <label htmlFor="diary-input">Enter a journal post</label>
          <input
            className="diary-input"
            name="diary-input"
            id="diary-input"
            type="text"
            placeholder="Vill du tillägga något?"
            onChange={this.onChange}
            value={diary}
          />

          <NextButton onClick={this.saveDiary} />
        </form>
      </div>
    );
  }
}

export default DiaryInput;
