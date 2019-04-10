import React, { Component } from 'react';
import GenericProgressBar from './GenericProgressBar.js';

class HungerBar extends Component {
	render() {
		return(
			<div>
				<GenericProgressBar percentage={this.props.hunger}
									name={"Hunger"}
									paddingTop={11}
									rangeBottom={this.props.rangeBottom}
									rangeTop={this.props.rangeTop}
									rewardNumber={this.props.rewardNumberFood}/>
			</div>)
	}
}

export default HungerBar;