import React from 'react';
import './css/NextButton.css';

class NextButton extends React.Component{
  
  render(){
    
    const { onClick,color } = this.props;
    
    return (
      
      <div>
        {color ?
        (<button className="next-button" type="submit" style={color}>
        Gå vidare
        <i className="fa fa-arrow-right next-button-arrow" aria-hidden="true" />
      </button>)
        :
        (<button className="next-button" type="submit" onClick={onClick}>
        Gå vidare
        <i className="fa fa-arrow-right next-button-arrow" aria-hidden="true" />
      </button>)
        }
        
      </div>
    );
  }
  
}

export default NextButton;
