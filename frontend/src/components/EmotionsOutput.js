import React, { PureComponent } from 'react';
import FlipMove from 'react-flip-move';
import EmotionButton from './EmotionButton';

// function for creating the list of emotions available to the user
class EmotionsOutput extends PureComponent {
  render() {
    const { emotions, filterByColor, handleChecked } = this.props;
    // create emotion buttons from all alternatives available in emotions state
    let emotionsToShow = emotions;
    // check if one or more color filters are activated
    if (filterByColor.length > 0) {
      emotionsToShow = emotions.filter((item) =>
        filterByColor.includes(item.color)
      );
    }
    // crate each emotion button
    const emotionsOutput = emotionsToShow.map((item) => (
      <EmotionButton
        item={item}
        key={item.name}
        returnFunction={handleChecked}
      />
    ));

    return (
      <div className="emotion-list">
        <FlipMove duration={500} staggerDurationBy={20}>
          {emotionsOutput}
        </FlipMove>
      </div>
    );
  }
}

export default EmotionsOutput;
