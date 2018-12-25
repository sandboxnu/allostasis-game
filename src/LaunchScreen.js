import React, { Component } from 'react';
import './LaunchScreen.css';
import Grid from './Grid/Grid.js'


function StartButton(props) {
	return(
		<button onClick={props.onClick}>
			Start Game
		</button>);
}



class LaunchScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {gameStarted: false}
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
			screen = <StartButton onClick={this.handleStartClick}/>;
		}
		return (
			<div className="launchScreen">
				{screen}
			</div>
		);
	}
}

export default LaunchScreen;