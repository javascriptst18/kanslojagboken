import { Component } from 'react';
import ReactFauxDom from 'react-faux-dom';
import { select } from 'd3-selection';
import cloud from 'd3-cloud';

const defaultClickEvent = (word) => {
  // eslint-disable-next-line no-console
  console.log(word);
};

const defaultFontSizeMapper = (word) => Math.log2(word.value) * 20;

class WordCloud extends Component {
  static defaultProps = {
    width: 700,
    height: 600,
    padding: 5,
    font: 'serif',
    fontSizeMapper: defaultFontSizeMapper,
    rotate: 0,
    onWordClick: defaultClickEvent,
    fill: 'blue',
  };

  componentWillMount() {
    this.wordCloud = ReactFauxDom.createElement('div');
  }

  render() {
    const {
      data,
      width,
      height,
      padding,
      font,
      fontSizeMapper,
      rotate,
      onWordClick,
    } = this.props;
    const wordCounts = data.map((text) => ({ ...text }));

    // clear old words
    select(this.wordCloud)
      .selectAll('*')
      .remove();

    // render based on new data
    const layout = cloud()
      .size([width, height])
      .font(font)
      .words(wordCounts)
      .padding(padding)
      .rotate(rotate)
      .fontSize(fontSizeMapper)
      .on('end', (words) => {
        select(this.wordCloud)
          .append('svg')
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .append('g')
          .attr(
            'transform',
            `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`
          )
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', (d) => `${d.size}px`)
          .style('font-family', font)
          .style('fill', (d) => {
            console.log('d: ', d);
            return `${d.color}`;
          })
          .attr('text-anchor', 'middle')
          .attr(
            'transform',
            (d) => `translate(${[d.x, d.y]})rotate(${d.rotate})`
          )
          .text((d) => d.text)
          .on('click', (d) => onWordClick(d));
      });

    layout.start();

    return this.wordCloud.toReact();
  }
}

export default WordCloud;
