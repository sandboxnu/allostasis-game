import React, { Component } from 'react';
import GenericProgressBar from './GenericProgressBar.js';

class LoadBar extends Component {

	render() {
		return(
			<div>
				<GenericProgressBar percentage={this.props.load}
									name={"Load"}
									paddingTop={-1}/>
			</div>)
	}
}

export default LoadBar;