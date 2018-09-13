import React from 'react';
import { getFetch } from '../functions/fetchFunctions';
import '../css/ColorGradientStats.css';

class ColorGradientStats extends React.Component {
  state = {
    emotions: [],
    colorStops: '',
  };

  componentDidMount() {
    const { freqData } = this.props;
    this.setState(
      {
        emotions: freqData,
      },
      () => {
        this.setupGradient();
      }
    );
  }

  setupGradient = async () => {
    const { emotions } = this.state;
    // const now = new Date();
    // const year = now.getFullYear().toString();
    // let lastMonth = now.getMonth().toString();
    // if (lastMonth < 10) {
    //   lastMonth = `0${lastMonth}`;
    // }
    // let month = (now.getMonth() + 1).toString();
    // if (month < 10) {
    //   month = `0${month}`;
    // }
    // const day = now.getDate().toString();
    // const startDate = year + lastMonth + day;
    // const today = year + month + day;
    // const result = await getFetch(
    //   `/userdatabydate?id=5b912c3f272a825d807bd24f&datestart=${startDate}&dateend=${today}`
    // );
    const result = emotions;
    const colorCount = {
      red: {
        count: 0,
        words: [],
      },
      green: {
        count: 0,
        words: [],
      },
      blue: {
        count: 0,
        words: [],
      },
      orange: {
        count: 0,
        words: [],
      },
      yellow: {
        count: 0,
        words: [],
      },
      pink: {
        count: 0,
        words: [],
      },
      turquoise: {
        count: 0,
        words: [],
      },
      purple: {
        count: 0,
        words: [],
      },
    };
    let totalCount = 0;
    for (let i = 0; i < Object.keys(result).length; i += 1) {
      const arrayFromObject = Object.entries(result)[i];
      // console.log(arrayFromObject);
      // const whichColor = emotions.filter(
      //   (item) => item.name === arrayFromObject[0]
      // );
      const newCount =
        colorCount[arrayFromObject[1][1]].count + arrayFromObject[1][0];
      colorCount[arrayFromObject[1][1]].count = newCount;
      const wordObject = {
        word: arrayFromObject[0],
        usedNumberOfTimes: arrayFromObject[1][0],
      };
      colorCount[arrayFromObject[1][1]].words.push(wordObject);
      totalCount += arrayFromObject[1][0];
    }
    // const totalCount = Object.keys(result)
    //   .map((key) => result[key])
    //   .reduce((previous, current) => previous + current);
    const percentages = [];
    Object.entries(colorCount).forEach(([key, value]) =>
      percentages.push({
        [key]: {
          percentages: (value.count / totalCount) * 100,
          words: value.words,
        },
      })
    );
    this.setState({
      colorStops: percentages,
    });
  };

  render() {
    const { colorStops } = this.state;
    const orderedColorArray = [];
    if (colorStops.length > 0) {
      for (let i = 0; i < colorStops.length; i += 1) {
        const entries = Object.entries(colorStops[i]);
        console.log(entries);
        if (entries[0][1].percentages !== 0) {
          let colorName = '';
          let colorNumber = '';
          switch (entries[0][0]) {
            case 'red':
              colorNumber = 0;
              colorName = 'Röd';
              break;

            case 'orange':
              colorNumber = 1;
              colorName = 'Orange';
              break;

            case 'yellow':
              colorNumber = 2;
              colorName = 'Gul';
              break;

            case 'green':
              colorNumber = 3;
              colorName = 'Grön';
              break;

            case 'turquoise':
              colorNumber = 4;
              colorName = 'Turkos';
              break;

            case 'blue':
              colorNumber = 5;
              colorName = 'Blå';
              break;

            case 'purple':
              colorNumber = 6;
              colorName = 'Lila';
              break;

            case 'pink':
              colorNumber = 7;
              colorName = 'Rosa';
              break;
          }
          orderedColorArray[colorNumber] = {
            color: entries[0][0],
            percentage: entries[0][1].percentages,
            name: colorName,
            words: entries[0][1].words,
          };
        }
      }

      // let percentageCounter = 0;
      // for (let j = 0; j < arrayWithoutEmptyItems.length; j += 1) {
      //   gradient += `${arrayWithoutEmptyItems[j].color} ${percentageCounter}%`;
      //   if (percentageCounter < 100) {
      //     gradient += ', ';
      //   }
      //   percentageCounter += arrayWithoutEmptyItems[j].percentage;
      //   gradient += `${arrayWithoutEmptyItems[j].color} ${percentageCounter}%`;
      //   if (percentageCounter < 100) {
      //     gradient += ', ';
      //   }
      // }
    }
    // const gradientStyle = {
    //   background: `linear-gradient(to right, ${gradient})`,
    //   width: '100%',
    //   height: '40px',
    //   display: 'block',
    // };
    const arrayWithoutEmptyItems = orderedColorArray.filter(Boolean);
    const flexboxItems = arrayWithoutEmptyItems.map((item) => (
      <div
        className={item.color}
        style={{
          width: `${item.percentage}%`,
          height: '100px',
        }}
      />
    ));
    const flexBoxDetails = arrayWithoutEmptyItems.map((item) => (
      <div className="color-gradient-data" data-gradientcolor={item.color}>
        <h2 className={`gradient-headline-${item.color}`}>
          {`${Math.round(item.percentage)}%`}
        </h2>
        <p>
          <strong>{Math.round(item.percentage)}% av orden</strong> du valt har
          haft färgen <span className={item.color}>{item.name}</span>. Här under
          ser du vilka ord du valt och hur många gånger de förekommer:
                        </p>
        <ul>
          {item.words.map((wordItem) => (
            <li>
              {wordItem.word} ({`${wordItem.usedNumberOfTimes}x`})
                                    </li>
          ))}
        </ul>
      </div>
    ));
    return (
      <React.Fragment>
        <div className="color-gradient-container">{flexboxItems}</div>
        <div className="gradient-details-container">{flexBoxDetails}</div>
      </React.Fragment>
    );
  }
}

export default ColorGradientStats;
