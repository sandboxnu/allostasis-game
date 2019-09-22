import React, { Component, Button } from 'react';
import './LaunchScreen.css';
import GameController from './GameController';
import Axios from 'axios';
import ServerUtils from './ServerUtils';
import ConfigurableValuesController from './ConfigurableValuesController';
import TutorialInfo from './TutorialInfo';


class LaunchScreen extends Component {
	constructor(props) {
		super(props);
    this.state = {
			gameStarted: false,
			hasConfigLoaded: false,
		};
	}

	componentWillMount() {
		Axios.get(ServerUtils.getServerUrl()+'/experiment')
		.then(result => {ConfigurableValuesController.update(result.data)})
		.catch(error => {ConfigurableValuesController.update(ServerUtils.sendDefaultJson())});
		this.setState({
			hasConfigLoaded: true
		})
	}

	renderLaunchScreen(){
		return (
			<div class = "launchContainer">
				<div class = "launchTitle"> Allostasis-Test Behaviour Study</div>
				<div class = "launchSubtitle"> {ConfigurableValuesController.getIntroDescription()}</div>
				{this.renderStartButton()}
				<div class = "launchFooter"> Developed by <a class = "sandboxLink" href="https://sandboxneu.com/"> Sandbox Research Group </a> for David Melnikoff.</div>
			</div>	
		);
	}

	renderStartButton() {
		let buttonBg = this.state.hasConfigLoaded ? {background: '#f7b733', color: 'white'} : {background: '#fbdb99', color:'white'};
		let buttonTxt = this.state.hasConfigLoaded ? "Click on the button above to start!" : "Please wait while the game loads!"
		return(
			<div>
				<a class="button" onClick={this.handleStartClick} role="button" id = "player-begin" style={buttonBg}> Start Study</a>
				<div class = "bottomSubtitle"> {buttonTxt} </div>
			</div>);
	}

	handleStartClick = () => {
		if (this.state.hasConfigLoaded) {
			this.setState({gameStarted: true});
		}
  }

	render() {
		const startClicked = this.state.gameStarted;
		let screen;

		if (startClicked) {
			screen = <TutorialInfo/>
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