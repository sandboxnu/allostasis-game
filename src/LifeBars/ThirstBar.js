import React, { Component } from 'react';
import GenericProgressBar from './GenericProgressBar.js';
import './LifeBarController.css';

class ThirstBar extends Component {
	render() {
		const rewardWaterColor = this.props.rewardNumberWater === null ? '#ffffff' : '#6FB9F3';
		const rewardNumberWater = this.props.rewardNumberWater === null ? '0.0' : this.props.rewardNumberWater;

		return(
			<div>
				<p class = "reward" style={{color: rewardWaterColor}}>{rewardNumberWater}</p>
				<GenericProgressBar percentage={this.props.thirst}
									name={"Thirst"}
									paddingTop={5}
									rangeBottom={this.props.rangeBottom}
									rangeTop={this.props.rangeTop}
									rewardNumber={this.props.rewardNumberFood}/>
			</div>)
	}
}

export default ThirstBar;