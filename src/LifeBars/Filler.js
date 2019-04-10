import React from 'react';
import './Filler.css';

const Filler = (props) => {
  return <div className="filler" style={{ width: `${props.percentage}%`, background:props.color}} />
}

export default Filler;