import React, { Component } from 'react';
import GenericProgressBar from './GenericProgressBar.js';

class LoadBar extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<div>
				<GenericProgressBar percentage={this.props.load}/>
			</div>)
	}
}

export default LoadBar;