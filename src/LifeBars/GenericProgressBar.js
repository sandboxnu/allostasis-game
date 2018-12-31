import React from 'react';
import Filler from './Filler.js';
import './GenericProgressBar.css';

const GenericProgressBar = (props) => {
	return(
		<div className="generic-progress">
			<Filler percentage={props.percentage}/>
		</div>
		)
}

export default GenericProgressBar;