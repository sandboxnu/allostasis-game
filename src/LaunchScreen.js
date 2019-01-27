import React, { Component, Button } from 'react';
import './LaunchScreen.css';
import GameController from './GameController';


class LaunchScreen extends Component {
	constructor(props) {
		super(props);
    this.state = {gameStarted: false};
	}

	renderLaunchScreen(){
		return (
			<div class = "launchContainer">
				<div class = "launchTitle"> Allostasis Behaviour Study</div>
				<div class = "launchSubtitle"> This is a placeholder for the subtitle. A simple description of the study can be placed here.</div>
				{this.renderStartButton()}
				<div class = "launchFooter"> Developed by <a class = "sandboxLink" href="https://sandboxneu.com/"> Sandbox Research Group </a> for David Melnikoff.</div>
			</div>	
		);
	}

	renderStartButton() {
		return(
			<div>
				<a class="button" onClick={this.handleStartClick} role="button" id = "player-begin">Start Study</a>
				<div class = "bottomSubtitle"> Click on the button above to start!</div>
			</div>);
	}

	handleStartClick = () => {
		this.setState({gameStarted: true});
  	}

	render() {
		const startClicked = this.state.gameStarted;
		let screen;

		if (startClicked) {
			screen = <GameController/>
		} else {
			screen = this.renderLaunchScreen();
		}
		return (
			<div className="launchScreen">
				{screen}
			</div>
		);
	}
}

export default LaunchScreen;