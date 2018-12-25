import React, { Component } from 'react';
import Grid from './Grid/Grid.js'
import ConfigurableValuesController from './ConfigurableValuesController.js';
import GlobalConstants from './GlobalConstants.js';

const ENTER_KEY = 13;
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;

const GRID_LENGTH = ConfigurableValuesController.getGridRowLength();

class GameController extends Component {


  constructor() {
    super();
    this.state = {
      currentGrid: this.generateGrid()
    }
    console.log(this.state.currentGrid);
  }

  generateGrid() {
    var generatedGrid = new Array(GRID_LENGTH);

    for(var i = 0; i < GRID_LENGTH; i++) {
      generatedGrid[i] = this.generateGridRow();
    }

    generatedGrid = this.insertWaterAndFood(generatedGrid);
    return generatedGrid;
  }

  generateGridRow() {
    var gridRow = new Array(GRID_LENGTH);
  
    for(var i = 0; i < GRID_LENGTH; i++) {
      gridRow[i] = GlobalConstants.EMPTY_GRID_CELL;
    }

    return gridRow;
  }

  insertWaterAndFood(grid) {
    console.debug(grid);
    var numWaterOne = ConfigurableValuesController.getNumWaterOne();
    var numWaterTwo = ConfigurableValuesController.getNumWaterTwo();
    var numFoodOne = ConfigurableValuesController.getNumFoodOne();
    var numFoodTwo = ConfigurableValuesController.getNumFoodTwo();
    var x = 0;
    var y = 0;

    while (numWaterOne > 0 || numWaterTwo > 0 || numFoodOne > 0 || numFoodTwo > 0) {
      x = Math.max(Math.min(Math.round(Math.random() * GRID_LENGTH), GRID_LENGTH - 1), 0);
      y = Math.max(Math.min(Math.round(Math.random() * GRID_LENGTH), GRID_LENGTH -1), 0);

      if (numWaterOne > 0) {
        if (grid[x][y] === GlobalConstants.EMPTY_GRID_CELL) {
          grid[x][y] = GlobalConstants.WATER_ONE_GRID_CELL;
          numWaterOne--;
        }
      } else if (numWaterTwo > 0) {
        if (grid[x][y] === GlobalConstants.EMPTY_GRID_CELL) {
          grid[x][y] = GlobalConstants.WATER_TWO_GRID_CELL;
          numWaterTwo--;
        }
      } else if (numFoodOne > 0) {
        if (grid[x][y] === GlobalConstants.EMPTY_GRID_CELL) {
          grid[x][y] = GlobalConstants.FOOD_ONE_GRID_CELL;
          numFoodOne--;
        }
      } else {
        if (grid[x][y] === GlobalConstants.EMPTY_GRID_CELL) {
          grid[x][y] = GlobalConstants.FOOD_TWO_GRID_CELL;
          numFoodTwo--;
        }
      }
    }

    return grid;
  }

  
  componentWillMount(){
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
  }

  _handleKeyDown = (event) => {
    switch( event.keyCode ) {
        case ENTER_KEY:
            console.log("ENTER");
            break;
        case LEFT_KEY:
            console.log("LEFT");
            break;  
        case UP_KEY:
            console.log("UP");
            break;
        case RIGHT_KEY:
            console.log("RIGHT");
            break;
        case DOWN_KEY:
            console.log("DOWN");
            break;    
        default: 
            break;
    }
  }

  render() {
    return (
      <Grid
        gameGrid = {this.state.currentGrid}/>
    );
  }
}

export default GameController;
