import React, { Component } from 'react';
import './Grid.css';
import GridComponent from './GridComponent.js';
import ConfigurableValuesController from '../ConfigurableValuesController.js';
import GlobalConstants from '../GlobalConstants';
import WaterComponent from './WaterComponent';
import FoodComponent from './FoodComponent';

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
                             waterType={curGrid}/>);
        } else if (this.isFoodObject(curGrid)) {
          gridObjects.push(<FoodComponent
                             size={size}
                             foodType={curGrid}/>);
        } else {
          gridObjects.push(<GridComponent
                              size={size}/>);
        }
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
