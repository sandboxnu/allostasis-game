import React from 'react';
import Filler from './Filler.js';
import './GenericProgressBar.css';

const renderRanges = (bar, bottom, top) => {
	if (bar === 'Load') {
		return false;
	}
	top = top + "%";
	bottom = bottom + "%";
	return (
		<div>
			<div className="range-bottom" style = {{left: bottom}}></div>
			<div className="range-top" style ={{left: top}}> </div>
		</div>
	);
}

const renderRangesVertical = (bar, bottom, top) => {
	top = 425 - ((top/100) * 350 * 1);
	bottom = 425 - ((bottom/100) *350 * 1);
	return (
		<div>
			<div className="range-bottom-vertical" style = {{top: top}}></div>
			<div className="range-top-vertical" style ={{top: bottom}}> </div>
		</div>
	);
}

const GenericProgressBar = (props) => {
	let fillerColor = '#f7b733';

	if(props.name === 'Thirst') {
		fillerColor = '#6FB9F3'
	} else if(props.name === 'Hunger') {
		fillerColor = '#49AD1B'
	}

	if (props.name === 'Thirst' || props.name === 'Hunger') {
		return(
			<div className="genericContainerVertical">
				<div className="generic-progress-vertical" style={{backgroundColor:fillerColor}}>
					<Filler percentage={props.percentage} color={fillerColor} isVertical={true}/>
					{renderRangesVertical(props.name, props.rangeBottom, props.rangeTop, 80)}
				</div>
				<div className="textBoxVertical" style={{paddingTop: props.paddingTop}}>
					{props.name}
				</div> 
			</div>
			)
	}

	return(
		<div>
			<div className="textBox">
					{props.name}
			</div> 
			<div className="genericContainer">
				<div className="generic-progress">
					<Filler percentage={props.percentage} color={fillerColor}/>
					{renderRanges(props.name, props.rangeBottom, props.rangeTop, 80)}
				</div>
			</div>
		</div>
		)
}

export default GenericProgressBar;