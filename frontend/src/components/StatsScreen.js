import React, { PureComponent } from 'react';
import WordCloud2 from './stats/WordCloud';
import ColorGradientStats from './stats/ColorGradientStats';
import './css/StatsScreen.css';
// Function for outputting the splash screen on page load
class StatsScreen extends PureComponent {
  state = {
    wordCloudOpen: true,
    colorGradientOpen: false,
  };

  render() {
    const { emotions } = this.props;
    const { wordCloudOpen, colorGradientOpen } = this.state;
    return (
      <div className="stats-screen">
        <div className="headline-container">
          <h2>Utforska din statistik</h2>
        </div>
        {wordCloudOpen && (
          <div className="word-cloud-wrapper">
            <WordCloud2 />
          </div>
        )}
        {colorGradientOpen && (
          <ColorGradientStats key="colorGradient" emotions={emotions} />
        )}
      </div>
    );
  }
}

export default StatsScreen;
