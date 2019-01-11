import React, { Component } from 'react';
import Grid from './Grid/Grid.js'
import ConfigurableValuesController from './ConfigurableValuesController.js';
import GlobalConstants from './GlobalConstants.js';
import LifeBarController from './LifeBars/LifeBarController.js'
import "./GameController.css"

const ENTER_KEY = 13;
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;

const GRID_LENGTH = ConfigurableValuesController.getGridRowLength();

class GameController extends Component { 

  constructor() {
    super();
    this.curThirst = ConfigurableValuesController.getInitialThirst();
    this.curHunger = ConfigurableValuesController.getInitialHunger();
    this.curLoad = ConfigurableValuesController.getInitialLoad();
    this.state = {
      currentGrid: this.generateGrid(),
      playerXPos: ConfigurableValuesController.getInitialXPos(),
      playerYPos: ConfigurableValuesController.getInitialYPos(),
      hunger: this.curHunger,
      thirst: this.curThirst,
      load: this.curLoad
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
            this._handlePlayerMovement(-1, 0);
            break;  
        case UP_KEY:
            this._handlePlayerMovement(0, -1);
            break;
        case RIGHT_KEY:
            this._handlePlayerMovement(1, 0);
            break;
        case DOWN_KEY:
            this._handlePlayerMovement(0, 1);
            break;    
        default: 
            break;
    }
  }

  _adjustThirst(num) {
    let temp = this.curThirst;
    temp += num
    if (temp >= 0) {
      if (temp > 100) {
        this.curThirst = 100;
      } else {
        this.curThirst = temp;
      }
    } else {
      this.curThirst = 0;
    }
  }

  _adjustHunger(num) {
    let temp = this.curHunger;
    temp += num
    if (temp >= 0) {
      if (temp > 100) {
        this.curHunger = 100;
      } else {
        this.curHunger = temp;
      }
    } else {
      this.curHunger = 0;
    }
  }

  _adjustLoad(num) {
    let temp = this.curLoad;
    temp += num
    if (temp >= 0) {
      if (temp > 100) {
        this.curLoad = 100;
      } else {
        this.curLoad = temp;
      }
    } else {
      this.curLoad = 0;
    }
  }

  _handlePlayerMovement(xMov, yMov) {
    let curX = this.state.playerXPos;
    let curY = this.state.playerYPos;
    curX += xMov;
    curY += yMov;

    if (curX >= 0 && curX < ConfigurableValuesController.getGridRowLength() 
        && curY >= 0 && curY < ConfigurableValuesController.getGridRowLength()) {
      this._adjustThirst(-1);
      this._adjustHunger(-1);
      this._adjustLoad(1);
      this.setState({
        playerXPos: curX,
        playerYPos: curY,
        thirst: this.curThirst,
        hunger: this.curHunger,
        load: this.curLoad
      });
    }
    
  }

  render() {
    return (
      <div className="gameController">
        <Grid
          gameGrid = {this.state.currentGrid}
          playerX = {this.state.playerXPos}
          playerY = {this.state.playerYPos}/>
        <LifeBarController
          hunger={this.state.hunger}
          thirst={this.state.thirst}
          load={this.state.load}/>
      </div>
    );
  }
}

export default GameController;
