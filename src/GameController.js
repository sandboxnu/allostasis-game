import React, { Component } from 'react';
import Grid from './Grid/Grid.js'
import ConfigurableValuesController from './ConfigurableValuesController.js';
import GlobalConstants from './GlobalConstants.js';
import LifeBarController from './LifeBars/LifeBarController.js';
import ServerUtils from './ServerUtils';
import "./GameController.css";

const ENTER_KEY = 13;
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;


class GameController extends Component { 

  constructor() {
    super();
    this.hasSentData = false;
    this.rowLength = ConfigurableValuesController.getGridRowLength();
    this.columnLength = ConfigurableValuesController.getGridColumnLength();
    this.curThirst = ConfigurableValuesController.getInitialThirst();
    this.curHunger = ConfigurableValuesController.getInitialHunger();
    this.curLoad = ConfigurableValuesController.getInitialLoad();
    this.hungerLowerBound = ConfigurableValuesController.getHungerLowerBound();
    this.hungerUpperBound = ConfigurableValuesController.getHungerUpperBound();
    this.thirstLowerBound = ConfigurableValuesController.getThirstLowerBound();
    this.thirstUpperBound = ConfigurableValuesController.getThirstUpperBound();
    this.tick = this.tick.bind(this);
    this.generateStateInfo = this.generateStateInfo.bind(this);
    this.data = []
    this.loadRate = ConfigurableValuesController.getLoadRate();

    this.state = {
      entities: this._generateEntities(),
      playerXPos: ConfigurableValuesController.getInitialXPos(),
      playerYPos: ConfigurableValuesController.getInitialYPos(),
      hunger: this.curHunger,
      thirst: this.curThirst,
      load: this.curLoad,
      curTick: 0,
      lastAction: GlobalConstants.actionEnum.Start
    }
  }

  _generateEntities() {
    if (ConfigurableValuesController.isChoosingStartingPosition()) {
      return ConfigurableValuesController.getStartingEntities();
    }

    let entities = [];
    this._placeEntity(entities, ConfigurableValuesController.getEntityDataWater1());
    this._placeEntity(entities, ConfigurableValuesController.getEntityDataWater2());
    this._placeEntity(entities, ConfigurableValuesController.getEntityDataFood1());
    this._placeEntity(entities, ConfigurableValuesController.getEntityDataFood2());
    return entities;
  }

  // Creates a new entity with the specified data and random coordinates,
  // placing it into the array `entities`
  _placeEntity(entities, new_entity_data) {
    let random_coord = (upperLimit) => {
      return Math.max(Math.min(Math.round(Math.random() * upperLimit), upperLimit - 1), 0);
    };
    let no_placement_conflict = entity => {
      return x !== entity.x && y !== entity.y;
    }

    do {
      var x = random_coord(this.rowLength);
      var y = random_coord(this.columnLength);
      entities.push({x, y, data: new_entity_data});
    } while(entities.every(no_placement_conflict));
  }
  
  componentWillMount(){
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
    clearInterval(this.interval)
  }

  _handleKeyDown = (event) => {
    switch( event.keyCode ) {
        case ENTER_KEY:
            break;
        case LEFT_KEY:
            this._handlePlayerMovement(-1, 0, GlobalConstants.actionEnum.MovedLeft);
            break;  
        case UP_KEY:
            this._handlePlayerMovement(0, -1, GlobalConstants.actionEnum.MovedUp);
            break;
        case RIGHT_KEY:
            this._handlePlayerMovement(1, 0, GlobalConstants.actionEnum.MovedRight);
            break;
        case DOWN_KEY:
            this._handlePlayerMovement(0, 1, GlobalConstants.actionEnum.MovedDown);
            break;    
        default: 
            break;
    }
    this.data.push(this.generateStateInfo())
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

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  tick() {
    this.setState({
      curTick: this.state.curTick + 1
    });
  }

  _loadIncrease() {
    let thirstSubOptimal = (this.curThirst < this.thirstLowerBound) || (this.curThirst > this.thirstUpperBound);
    let hungerSubOptimal = (this.curHunger < this.hungerLowerBound) || (this.curHunger > this.hungerUpperBound);

    if (thirstSubOptimal && hungerSubOptimal) {
      return 2 * this.loadRate;
    } 
    if (thirstSubOptimal || hungerSubOptimal) {
      return this.loadRate;
    }
    return 0;
  }

  _handlePlayerMovement(xMov, yMov, move) {
    let curX = this.state.playerXPos;
    let curY = this.state.playerYPos;
    curX += xMov;
    curY += yMov;

    if (curX >= 0 && curX < this.rowLength
        && curY >= 0 && curY < this.columnLength) {
      let entitiesHere = this.state.entities.filter(e => e.x === curX && e.y === curY);
      let entityRewards = entitiesHere.reduce((total, e) => {
        let rewards = e.data.reward_fn();
        return {
          food: total.food + rewards.food,
          water: total.water + rewards.water,
        }
      }, {
        food: ConfigurableValuesController.getMovementHungerDecay(),
        water: ConfigurableValuesController.getMovementThirstDecay(),
      });

      if (ConfigurableValuesController.getShouldRelocateEntities()) {
        this.relocateEntities(entitiesHere);
      }

      let loadDelta = this._loadIncrease();
      this._adjustThirst(entityRewards.water);
      this._adjustHunger(entityRewards.food);
      this._adjustLoad(loadDelta);
      this.setState({
        playerXPos: curX,
        playerYPos: curY,
        thirst: this.curThirst,
        hunger: this.curHunger,
        load: this.curLoad,
        lastAction: move
      });
    }
  }

  relocateEntities(entitiesToRelocate) {
    if (entitiesToRelocate == null || entitiesToRelocate.size === 0) {
      return;
    } 

    let newEntities = this.state.entities.filter(e => !entitiesToRelocate.includes(e));
    let self = this;

    entitiesToRelocate.forEach(function(e) {
      if (e.data.name === 'F1') {
        self._placeEntity(newEntities, ConfigurableValuesController.getEntityDataFood1());
      } else if (e.data.name === 'F2') {
        self._placeEntity(newEntities, ConfigurableValuesController.getEntityDataFood2());
      } else if (e.data.name=== 'W1') {
        self._placeEntity(newEntities, ConfigurableValuesController.getEntityDataWater1());
      } else if (e.data.name === 'W2') {
        self._placeEntity(newEntities, ConfigurableValuesController.getEntityDataWater2());
      }
    });

    this.setState({
      entities: newEntities
    })
  }

  generateStateInfo() {
    return({
      tick : this.state.curTick,
      playerPos: [this.state.playerXPos, this.state.playerYPos],
      lastAction: this.state.lastAction,
      hunger: this.curHunger,
      thirst: this.curThirst,
      load: this.curLoad
    });
  }

  checkForEndGame() {
    return this.state.hunger >= 100 || this.state.hunger <= 0 || this.state.thirst >= 100 || this.state.thirst <=0 || this.state.load >= 100;
  }

  renderEndGame() {
    if (!this.hasSentData) {
      let finalData ={
        configValues: ConfigurableValuesController.getConfigurableValues(),
        data: this.data
      };
      ServerUtils.sendData(finalData)
      this.hasSentData = true;
    }
    return (
        <div>
          GAME OVER
        </div>

      );
  }

  render() {
    if (this.checkForEndGame()) {
      return this.renderEndGame();
    }
    return (
      <div className="gameController">
        <Grid
          gameGrid = {this.state.currentGrid}
          entities = {this.state.entities}
          playerX = {this.state.playerXPos}
          playerY = {this.state.playerYPos}/>
        <LifeBarController
          hunger={this.state.hunger}
          thirst={this.state.thirst}
          load={this.state.load}
          hungerRangeBottom={this.hungerLowerBound}
          hungerRangeTop={this.hungerUpperBound}
          thirstRangeBottom={this.thirstLowerBound}
          thirstRangeTop={this.thirstUpperBound}/>
      </div>
    );
  }
}

export default GameController;
