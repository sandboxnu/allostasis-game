import React from 'react';
import Filler from './Filler.js';
import './GenericProgressBar.css';

const GenericProgressBar = (props) => {
	console.log(props.name);
	return(
		<div className="genericContainer">
			<div className="textBox">
				{props.name}
			</div> 
			<div className="generic-progress">
				<Filler percentage={props.percentage}/>
			</div>
		</div>
		)
}

export default GenericProgressBar;