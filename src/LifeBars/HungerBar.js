import React, { Component } from 'react';
import GenericProgressBar from './GenericProgressBar.js';

class HungerBar extends Component {
	render() {
		const rewardFoodColor = this.props.rewardNumberFood === null ? '#ffffff' : '#49AD1B';
		const rewardNumberFood = this.props.rewardNumberFood === null ? '0.0' : this.props.rewardNumberFood;

		return(
			<div>
				<p class = "reward" style={{color: rewardFoodColor}}>{rewardNumberFood}</p>
				<GenericProgressBar percentage={this.props.hunger}
									name={"Hunger"}
									paddingTop={5}
									rangeBottom={this.props.rangeBottom}
									rangeTop={this.props.rangeTop}
									rewardNumber={this.props.rewardNumberFood}/>
			</div>)
	}
}

export default HungerBar;