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

  toggleStats = (e) => {
    if (e.target.dataset.statsitem === 'wordcloud') {
      this.setState({
        wordCloudOpen: true,
        colorGradientOpen: false,
      });
    } else {
      this.setState({
        wordCloudOpen: false,
        colorGradientOpen: true,
      });
    }
  };

  render() {
    const { emotions, freqData } = this.props;
    const { wordCloudOpen, colorGradientOpen } = this.state;
    return (
      <div className="stats-screen">
        <div className="headline-container">
          <h2>Utforska din statistik</h2>
        </div>
        <div className="button-container">
          <button
            type="button"
            className={`stats-button${wordCloudOpen ? ' active' : ''}`}
            data-statsitem="wordcloud"
            onClick={this.toggleStats}
          >
            <i className="fas fa-cloud" />
            Känslomoln
          </button>
          <button
            type="button"
            className={`stats-button${colorGradientOpen ? ' active' : ''}`}
            data-statsitem="colorgradient"
            onClick={this.toggleStats}
          >
            <i className="fas fa-palette" />
            Färgkarta
          </button>
        </div>
        {wordCloudOpen && (
          <div className="word-cloud-wrapper">
            <WordCloud2 freqData={freqData} />
          </div>
        )}
        {colorGradientOpen && (
          <ColorGradientStats
            key="colorGradient"
            emotions={emotions}
            freqData={freqData}
          />
        )}
      </div>
    );
  }
}

export default StatsScreen;
