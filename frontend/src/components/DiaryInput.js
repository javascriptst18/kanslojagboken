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
    
    this.props.toggleMenu();
    const { diary } = this.state;
    event.preventDefault();
    // Detta är bara en placeholder för vilken route vi nu kommer ha till databasen
    if(diary){
     const body={id:"5b912c3f272a825d807bd24f",data:diary}
      fetch('/savediary', {
        method: 'PATCH',
        // credentials: "same-origin",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    }
    
  };

  render() {
    const { diary } = this.state;
    
    return (
      <div className="diary-input-wrapper">
        <div className="diary-input-container">
          <span>Vill du tillägga något?</span>
          <label htmlFor="diary-input">Enter a journal post</label>
          <textarea style={{height:"100%"}}className="diary-input"
              name="diary-input"
              id="diary-input"
              type="text"
              placeholder="Skriv här"
              onChange={this.onChange}
              value={diary}>
            
            
              
           
          </textarea>
        </div>
        <NextButton onClick={this.saveDiary} />
      </div>
    );
  }
}

export default DiaryInput;
