import React from 'react';
import Filler from './Filler.js';
import './GenericProgressBar.css';

const renderRanges = (bar, bottom, top) => {
	if (bar === 'Load') {
		return null;
	}
	
	return (
		<div>
			<div className="range-bottom"></div>
			<div className="range-top"> </div>
		</div>
	);
}

const GenericProgressBar = (props) => {
	console.log(props.paddingTop);
	return(
		<div className="genericContainer">
			<div className="textBox" style={{paddingTop: props.paddingTop}}>
				{props.name}
			</div> 
			<div className="generic-progress">
				<Filler percentage={props.percentage}/>
				{renderRanges(props.name)}
			</div>
		</div>
		)
}

export default GenericProgressBar;