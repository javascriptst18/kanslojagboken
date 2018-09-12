import React, { PureComponent } from 'react';
import WordCloud2 from './stats/WordCloud';
import ColorGradientStats from './stats/ColorGradientStats';
import './css/StatsScreen.css';
// Function for outputting the splash screen on page load
class StatsScreen extends PureComponent {
  state = {
    wordCloudOpen: true,
    colorGradientOpen: false,
    wordsMounted: false,
  };

  setWordsMounted = () => {
    this.setState({ wordsMounted: true });
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
    const { wordCloudOpen, colorGradientOpen, wordsMounted } = this.state;
    return (
      <div className="stats-screen">
        <div className="headline-container">
          <h2>Utforska din statistik</h2>
          <button
            type="button"
            data-statsitem="wordcloud"
            onClick={this.toggleStats}
          >
            Känslomoln
          </button>
          <button
            type="button"
            data-statsitem="colorgradient"
            onClick={this.toggleStats}
          >
            Färgkarta
          </button>
        </div>
        {wordCloudOpen && (
          <div className={`word-cloud-wrapper${wordsMounted && ' generated'}`}>
            <WordCloud2
              returnFunction={this.setWordsMounted}
              freqData={freqData}
            />
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
