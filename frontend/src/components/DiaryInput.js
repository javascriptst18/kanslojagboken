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
      <div className="diary-input-wrapper">
        <div className="diary-input-container">
          <span>Vill du tillägga något?</span>
          <form>
            <label htmlFor="diary-input">Enter a journal post</label>
            <input
              className="diary-input"
              name="diary-input"
              id="diary-input"
              type="text"
              placeholder="Skriv här"
              onChange={this.onChange}
              value={diary}
            />
          </form>
        </div>
        <NextButton onClick={this.saveDiary} />
      </div>
    );
  }
}

export default DiaryInput;
