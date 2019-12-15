import React from 'react';
import './Filler.css';

const Filler = (props) => {
  const verticalHeight = 100 - props.percentage;
  if (props.isVertical) {
    return <div className="filler" style={{ height: `${verticalHeight}%`, background:"#ffffff"}} />
  }
  return <div className="filler" style={{ width: `${props.percentage}%`, background:props.color}} />
}

export default Filler;