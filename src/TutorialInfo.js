import React, { Component, Button } from 'react';
import './LaunchScreen.css';
import GameController from './GameController';
import Axios from 'axios';
import ServerUtils from './ServerUtils';
import ConfigurableValuesController from './ConfigurableValuesController';


class TutorialInfo extends Component {
	constructor(props) {
		super(props);
    this.state = {
            tutorialStarted: false,
            gameStarted: false,
            tutorialFinished: false,
		};
	}

	renderInfoScreen(){
        const subtitle  = this.state.tutorialStarted ? ConfigurableValuesController.getEndTutorialDescription() : ConfigurableValuesController.getBeginningTutorialDescription();
		return (
			<div class = "launchContainer">
				<div class = "launchTitle"> Allostasis Tutorial</div>
				<div class = "launchSubtitle"> {subtitle}</div>
				{this.renderStartButton()}
			</div>	
		);
	}

	renderStartButton() {
		let buttonBg = {background: '#f7b733', color: 'white'};
        let buttonBelowTxt = this.state.tutorialStarted ? "Click on the button above to start the game!" : 
        "Click on the button above to start the tutorial!";
        let buttonTxt = this.state.tutorialStarted ? "Start Study" : "Start Tutorial";

		return(
			<div>
				<a class="button" onClick={this.handleStartClick} role="button" id = "player-begin" style={buttonBg}> {buttonTxt} </a>
				<div class = "bottomSubtitle"> {buttonBelowTxt} </div>
			</div>);
	}

	handleStartClick = () => {
        if (this.state.tutorialFinished) {
            this.setState({gameStarted: true});
        } else {
            this.setState({tutorialStarted: true});
        }
    }

    endTutorial = () => {
        this.setState({tutorialFinished: true});
    }

	render() {
        const gameStarted = this.state.gameStarted;
        const tutorialStarted = this.state.tutorialStarted;
        const tutorialFinished = this.state.tutorialFinished;

		let screen;
        
		if (gameStarted) {
			screen = <GameController
                        isTutorial={false}/>
		} else if (tutorialStarted && !tutorialFinished){
			screen = <GameController
                        isTutorial={true}
                        endTutorial={this.endTutorial}/>
		} else {
            screen = this.renderInfoScreen();

        }
		return (
			<div className="launchScreen">
				{screen}
			</div>
		);
	}
}

export default TutorialInfo;