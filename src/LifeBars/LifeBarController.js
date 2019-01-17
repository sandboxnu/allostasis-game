import React, { Component } from 'react';
import ConfigurableValuesController from '../ConfigurableValuesController.js';
import ThirstBar from './ThirstBar.js';
import HungerBar from './HungerBar.js';
import LoadBar from './LoadBar.js';
import './LifeBarController.css';

class LifeBarController extends Component {
	constructor(props) {
		super(props);
		console.log("constructing LifeBarController");
	}

	render() {
		console.log("LifeBarController:" + this.props.thirst)
		return(
			<div className="life-bars">
				<ThirstBar thirst={this.props.thirst}/>
				<HungerBar hunger={this.props.hunger}/>
				<LoadBar load={this.props.load}/>
			</div>)

	}

}

export default LifeBarController;