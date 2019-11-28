import React, { Component } from 'react';
import Grid from './Grid/Grid.js'
import ConfigurableValuesController from './ConfigurableValuesController.js';
import GlobalConstants from './GlobalConstants.js';
import LifeBarController from './LifeBars/LifeBarController.js';
import ServerUtils from './ServerUtils';
import "./GameController.css";
import crc32 from 'js-crc';

const ENTER_KEY = 13;
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;


class GameController extends Component { 

  constructor() {
    super();
    this.reset();   
  }

  componentWillMount() {
		this.reset();
	}

  reset() {
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
    this.numMoves = 0;
    this.hasGameEnded = false;
    let startingEntities = ConfigurableValuesController.isChoosingStartingPosition() ? ConfigurableValuesController.getStartingEntities() : this._generateEntities();
    this.prevEntities = []
    this.finalCode = 0;

    this.rewardNumberColor = "#383d44";

    this.state = {
      entities: startingEntities,
      playerXPos: ConfigurableValuesController.getInitialXPos(),
      playerYPos: ConfigurableValuesController.getInitialYPos(),
      hunger: this.curHunger,
      thirst: this.curThirst,
      load: this.curLoad,
      curTick: 0,
      lastAction: GlobalConstants.actionEnum.Start,
      rewardNumberWater: null,
      rewardNumberFood: null,
    }
  }

  _generateEntities() {
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

    var x = random_coord(this.rowLength);
    var y = random_coord(this.columnLength);

    while(this._checkForCollision(x, y, entities)) {
      x = random_coord(this.rowLength);
      y = random_coord(this.columnLength);
    }
    entities.push({x, y, data: new_entity_data});
  }

  _checkForCollision(x, y, entities) {
    var collision = false;
    for (var i = 0; i < entities.length; i ++) {
      let entity = entities[i]      
      if (entity.x == x && entity.y == y) {
        return true;
      }
    }

    if (this.prevEntities) {
      for (var i = 0; i < this.prevEntities.length; i ++) {
        let entity = this.prevEntities[i]      
        if (entity.x == x && entity.y == y) {
          return true;
        }
      }
    }

    return collision;
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
    this.numMoves++;
    let curX = this.state.playerXPos;
    let curY = this.state.playerYPos;
    curX += xMov;
    curY += yMov;

    if (curX >= 0 && curX < this.rowLength
        && curY >= 0 && curY < this.columnLength) {
      let entitiesHere = this.state.entities.filter(e => e.x === curX && e.y === curY);
      console.log(entitiesHere);
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

      if (ConfigurableValuesController.getShouldRelocateEntities() && entitiesHere.length > 0) {
        this.relocateEntities();
      }

      let loadDelta = this._loadIncrease();
      if (entitiesHere.length > 0) {
        let rewardFood = null;
        let rewardWater = null;
        entitiesHere.forEach(function(element) {
          const eName = element.data.name;
          if (eName === "W1" || eName === "W2") {
            rewardWater = Math.max(0.0, entityRewards.water).toFixed(1);
          }
          if (eName === "F1" || eName === "F2") {
            rewardFood = Math.max(0.0, entityRewards.food).toFixed(1);
          }
        });

        this.setState({
          rewardNumberFood: rewardFood,
          rewardNumberWater: rewardWater
        });
      } else {
        this.setState({
          rewardNumberFood: null,
          rewardNumberWater: null
        });
      }

      if (entitiesHere.length > 0) {
        curX = ConfigurableValuesController.getInitialXPos();
        curY = ConfigurableValuesController.getInitialYPos();
      }


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

  relocateEntities() {
    this.prevEntities = this.state.entities;
    this.setState({
      entities: []
    });
    this.setState({
      entities: this._generateEntities()
    });
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

  generateCode() {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    var date = new Date();
    var code = firstPart + secondPart + date.getHours() + date.getMilliseconds() + date.getDay();
    return code.replace(/\D/g,'');

}

  renderEndGame() {
    if (this.isTutorial) {
      return;
    }

    if (!this.hasSentData) {
      this.finalCode = this.generateCode();
      var dt = new Date();
      var utcDate = dt.toUTCString();
      let finalData ={
        configValues: ConfigurableValuesController.getConfigurableValues(),
        data: this.data,
        timeStamp: utcDate,
        code: this.finalCode
      };
      console.log(finalData);
      ServerUtils.sendData(finalData)
      this.hasSentData = true;
    }

    return (
        <div>
          <p> <center>GAME OVER </center></p>
          <p> <center>Please return to the survey and enter <strong> {this.finalCode} </strong> as your code.</center></p>
        </div>

      );
  }

  endTutorial() {
    this.props.endTutorial();
  }

  render() {
    if (this.props.isTutorial && this.numMoves > 50) {
      this.reset();
      this.endTutorial();
    } else if (!this.props.isTutorial && (this.checkForEndGame() || this.hasGameEnded || this.numMoves > ConfigurableValuesController.getMaxMoves())) {
      this.hasGameEnded = true;
      return this.renderEndGame();
    }
    return (
      <div>
        <div className="gameController">
          <Grid
            gameGrid = {this.state.currentGrid}
            entities = {this.state.entities}
            playerX = {this.state.playerXPos}
            playerY = {this.state.playerYPos}/>
          <LifeBarController
            rewardNumberFood={this.state.rewardNumberFood}
            rewardNumberWater={this.state.rewardNumberWater}
            hunger={this.state.hunger}
            thirst={this.state.thirst}
            load={this.state.load}
            hungerRangeBottom={this.hungerLowerBound}
            hungerRangeTop={this.hungerUpperBound}
            thirstRangeBottom={this.thirstLowerBound}
            thirstRangeTop={this.thirstUpperBound}/>
        </div>
      </div>
      
    );
  }
}

export default GameController;
