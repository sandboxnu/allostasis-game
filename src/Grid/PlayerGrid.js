import React, { Component } from 'react';
import './PlayerGrid.css';
import GridComponent from './GridComponent.js'
import ConfigurableValuesController from '../ConfigurableValuesController';

class PlayerGrid extends GridComponent {
  constructor() {
    super();
    this.state = {
      xPos: ConfigurableValuesController.getInitialXPos(),
      yPos: ConfigurableValuesController.getInitialYPos()
    };
  }

  getXPos() {
    return this.props.xPos * this.props.size;
  }

  getYPos() {
    return (ConfigurableValuesController.getGridRowLength() - this.props.yPos) * this.props.size;
  }


  render() {
    return (
      <div className="playerGridOutline" style={{width: this.props.size, height: this.props.size, bottom: this.getYPos(), left: this.getXPos()}}>
        <img src={require("../assets/avatar.png")} alt="" className="profileImg" />
      </div>
    );
  }
}

export default PlayerGrid;
