import React, { Component } from 'react';
import GenericProgressBar from './GenericProgressBar.js';

class ThirstBar extends Component {
	render() {
		return(
			<div>
				<GenericProgressBar percentage={this.props.thirst}
									name={"Thirst"}
									paddingTop={5}/>
			</div>)
	}
}

export default ThirstBar;