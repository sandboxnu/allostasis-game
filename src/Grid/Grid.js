import React, { Component } from 'react';
import './Grid.css';
import GridComponent from './GridComponent.js';
import ConfigurableValuesController from '../ConfigurableValuesController.js';
import PlayerGrid from './PlayerGrid.js';

class Grid extends Component {

  constructor() {
    super();
    this.state = {
      randomVariable: true
    }

  }

  isPlayerObject() {

  }

  isWaterObject() {

  }

  isFoodObject() {

  }


  renderGrid() {
    let gridObjects = [];
    const gridRowLength = ConfigurableValuesController.getGridRowLength();
    const numObjects = gridRowLength * gridRowLength;
    const size = ConfigurableValuesController.getGridSize();
    for(let i = 0; i < numObjects; i++) {
      if(Math.random() >= 0.2){
        gridObjects.push(<GridComponent
                            size={size}/>);
      } else {
        gridObjects.push(<PlayerGrid
                          size={size}/>);
      }
    }

    return gridObjects;
  }

  render() {
    return (
      <div className="gridOutline">
        {this.renderGrid()}
      </div>
    );
  }
}

export default Grid;
