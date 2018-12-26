import React, { Component } from 'react';
import './LaunchScreen.css';
import Grid from './Grid/Grid.js'
import { Button } from 'react';



class LaunchScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {gameStarted: false}
		this.handleStartClick = this.handleStartClick.bind(this);
	}

	startButton() {
		return(
		<button onClick={this.handleStartClick}>
			Start Game
		</button>);
	}

	handleStartClick() {
		this.setState({gameStarted: true})
    }

	render() {
		const startClicked = this.state.gameStarted;
		let screen;

		if (startClicked) {
			screen = <Grid/>
		} else {
			screen = this.startButton();
		}
		return (
			<div className="launchScreen">
				{screen}
			</div>
		);
	}
}

export default LaunchScreen;