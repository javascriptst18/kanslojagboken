import React from 'react';

function ColorGradientDetails(props) {
  const { item, selectedColor } = props;
  return (
    <div
      key={item.color}
      className={`color-gradient-data${
        selectedColor === item.color ? ' selected' : ''
      }`}
      style={
        selectedColor === item.color
          ? { opacity: 1, transition: 'opacity 0.5s ease' }
          : { opacity: 0, transition: 'opacity 0.5s ease' }
      }
    >
      <h2 className={`gradient-headline-${item.color}`}>
        {`${Math.round(item.percentage)}%`}
      </h2>
      <p>
        <strong>{Math.round(item.percentage)}% av orden</strong> du valt har
        haft färgen 
{' '}
<span className={item.color}>{item.name}</span>
. Här under
        ser du vilka ord du valt och hur många gånger de förekommer:
</p>
      <ul>
        {item.words.map((wordItem) => (
          <li>
                  {wordItem.word} 
{' '}
<em>
(
{`${wordItem.usedNumberOfTimes}x`}
)
{' '}
</em>
                  </li>
        ))}
      </ul>
    </div>
  );
}

export default ColorGradientDetails;
