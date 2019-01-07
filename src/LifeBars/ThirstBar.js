import React, { Component } from 'react';
import GenericProgressBar from './GenericProgressBar.js';

class ThirstBar extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<div>
				<GenericProgressBar percentage={this.props.thirst} />
			</div>)
	}
}

export default ThirstBar;