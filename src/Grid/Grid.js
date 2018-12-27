import React, { Component } from 'react';
import './Grid.css';
import GridComponent from './GridComponent.js';
import ConfigurableValuesController from '../ConfigurableValuesController.js';
import GlobalConstants from '../GlobalConstants.js';
import WaterComponent from './WaterComponent.js';
import FoodComponent from './FoodComponent.js';
import PlayerGrid from './PlayerGrid.js';

class Grid extends Component {

  constructor() {
    super();
    this.state = {
      randomVariable: true
    }

  }

  isPlayerObject(gridval) {
  
  }

  isWaterObject(gridVal) {
    return gridVal === GlobalConstants.WATER_ONE_GRID_CELL || gridVal === GlobalConstants.WATER_TWO_GRID_CELL;
  }

  isFoodObject(gridVal) {
    return gridVal === GlobalConstants.FOOD_ONE_GRID_CELL || gridVal === GlobalConstants.FOOD_TWO_GRID_CELL;
  }


  renderGrid() {
    let gridObjects = [];
    const gridRowLength = ConfigurableValuesController.getGridRowLength();
    const size = ConfigurableValuesController.getGridSize();

    for (let x = 0; x < gridRowLength; x++) {
      for(let y = 0; y < gridRowLength; y++) {
        var curGrid = this.props.gameGrid[x][y];
        if (this.isWaterObject(curGrid)) {
          gridObjects.push(<WaterComponent
                             size={size}
                             waterType={curGrid}
                             x={x}
                             y={y}
                             key={x + ' ' + y}/>);
        } else if (this.isFoodObject(curGrid)) {
          gridObjects.push(<FoodComponent
                             size={size}
                             foodType={curGrid}
                             x={x}
                             y={y}
                             key={x + ' ' + y}/>);
        } else {
          gridObjects.push(<GridComponent
                              size={size}
                              x={x}
                              y={y}
                              key={x + ' ' + y}/>);
        }
      }
    }

    return gridObjects;
  }

  renderPlayer() {
    return <PlayerGrid
              size = {ConfigurableValuesController.getGridSize()}
              xPos = {this.props.playerX}
              yPos = {this.props.playerY}/>;
  }

  render() {
    return (
      <div className="gridOutline">
        {this.renderGrid()}
        {this.renderPlayer()}
      </div>
    );
  }
}

export default Grid;
