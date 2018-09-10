import React from 'react';
import { getFetch } from '../functions/fetchFunctions';

class ColorGradientStats extends React.Component {
  state = {
    colorStops: '',
  };

  componentDidMount() {
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
    console.log(startDate);
    console.log(today);
    const datestart = getFetch(
      `/userdatabydate?id=5b912c3f272a825d807bd24f&datestart=${startDate}&dateend=${today}`
    );
  }

  render() {
    return null;
  }
}

export default ColorGradientStats;
