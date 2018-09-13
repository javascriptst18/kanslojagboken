import React from 'react';
import { getFetch } from '../functions/fetchFunctions';

class ColorGradientStats extends React.Component {
  state = {
    emotions: [],
    colorStops: '',
  };

  componentDidMount() {
    const { emotions } = this.props;
    this.setState({ emotions }, () => {
      this.setupGradient();
    });
  }

  setupGradient = async () => {
    const { emotions } = this.state;
    const now = new Date();
    const year = now.getFullYear().toString();
    let lastMonth = now.getMonth().toString();
    if (lastMonth < 10) {
      lastMonth = `0${lastMonth}`;
    }
    let month = (now.getMonth() + 1).toString();
    if (month < 10) {
      month = `0${month}`;
    }
    const day = now.getDate().toString();
    const startDate = year + lastMonth + day;
    const today = year + month + day;
    const result = await getFetch(
      `/userdatabydate?id=5b912c3f272a825d807bd24f&datestart=${startDate}&dateend=${today}`
    );
    const colorCount = {
      red: 0,
      green: 0,
      blue: 0,
      orange: 0,
      yellow: 0,
      pink: 0,
      turquoise: 0,
      purple: 0,
    };
    for (let i = 0; i < Object.keys(result).length; i += 1) {
      const arrayFromObject = Object.entries(result)[i];
      const whichColor = emotions.filter(
        (item) => item.name === arrayFromObject[0]

      );
      
      const newCount = colorCount[whichColor[0].color] + arrayFromObject[1];
      colorCount[whichColor[0].color] = newCount;
    }
    const totalCount = Object.keys(result)
      .map((key) => result[key])
      .reduce((previous, current) => previous + current);
    const percentages = [];
    Object.entries(colorCount).forEach(([key, value]) =>
      percentages.push({ [key]: (value / totalCount) * 100 })
    );
    this.setState({ colorStops: percentages });
  };

  render() {
    const { colorStops } = this.state;
    const orderedColorArray = [];
    let gradient = '';
    if (colorStops.length > 0) {
      for (let i = 0; i < colorStops.length; i += 1) {
        const entries = Object.entries(colorStops[i]);
        if (entries[0][1] !== 0) {
          switch (entries[0][0]) {
            case 'red':
              orderedColorArray[0] = {
                color: '#b51316',
                percentage: entries[0][1],
              };
              break;

            case 'orange':
              orderedColorArray[1] = {
                color: '#e2701a',
                percentage: entries[0][1],
              };
              break;

            case 'yellow':
              orderedColorArray[2] = {
                color: '#f9e41c',
                percentage: entries[0][1],
              };
              break;

            case 'green':
              orderedColorArray[3] = {
                color: '#017f43',
                percentage: entries[0][1],
              };
              break;

            case 'turquoise':
              orderedColorArray[4] = {
                color: '#008988',
                percentage: entries[0][1],
              };
              break;

            case 'blue':
              orderedColorArray[5] = {
                color: '#081b64',
                percentage: entries[0][1],
              };
              break;

            case 'purple':
              orderedColorArray[6] = {
                color: '#6a005a',
                percentage: entries[0][1],
              };
              break;

            case 'pink':
              orderedColorArray[7] = {
                color: '#e44097',
                percentage: entries[0][1],
              };
              break;

            default:
              return null;
          }
        }
      }
      const arrayWithoutEmptyItems = orderedColorArray.filter(Boolean);
      let percentageCounter = 0; // Göra flexbox items istället
      for (let j = 0; j < arrayWithoutEmptyItems.length; j += 1) {
        gradient += `${arrayWithoutEmptyItems[j].color} ${percentageCounter}%`;
        if (percentageCounter < 100) {
          gradient += ', ';
        }
        percentageCounter += arrayWithoutEmptyItems[j].percentage;
        gradient += `${arrayWithoutEmptyItems[j].color} ${percentageCounter}%`;
        if (percentageCounter < 100) {
          gradient += ', ';
        }
      }
    }
    const gradientStyle = {
      background: `linear-gradient(to right, ${gradient})`,
      width: '100%',
      height: '40px',
      display: 'block',
    };
    return <div style={gradientStyle} />;
  }
}

export default ColorGradientStats;
