import React, { Component } from 'react';
import ConfigurableValuesController from '../ConfigurableValuesController.js';
import ThirstBar from './ThirstBar.js';
import HungerBar from './HungerBar.js';
import LoadBar from './LoadBar.js';
import './LifeBarController.css';

class LifeBarController extends Component {
	render() {
		const rewardWaterColor = this.props.rewardNumberWater <= 0 ? '#ffffff' : '#6FB9F3';
		const rewardFoodColor = this.props.rewardNumberFood <= 0 ? '#ffffff' : '#49AD1B';
		return(
			<div className = "life-bars-container">
				<div className="life-bars-rewards">
					<p class = "reward-left" style={{color: rewardWaterColor}}>{this.props.rewardNumberWater}</p>
					<p class = "reward" style={{color: rewardFoodColor}}>{this.props.rewardNumberFood}</p>
				</div>
				<div className="life-bars">
					<ThirstBar thirst={this.props.thirst}
								rangeBottom={this.props.thirstRangeBottom}
								rangeTop={this.props.thirstRangeTop}/>
					<HungerBar hunger={this.props.hunger}
							rangeBottom={this.props.hungerRangeBottom}
							rangeTop={this.props.hungerRangeTop}/>
					<LoadBar load={this.props.load}/>
				</div>
			</div>)

	}

}

export default LifeBarController;