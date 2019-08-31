import _ from 'lodash';

const gaussian = require('gaussian');
const GRID_SIZE_CONSTANT = 500

class ConfigurableValuesController {
  constructor() {
    this.gridColumnLength = 10;
    this.initialLoad = 0;
    this.loadRate = 2;
    this.meanWater1 = 2;
    this.water1Chance = 0.5;
    this.meanWater2 = 4;
    this.water2Chance = 0.5;
    this.meanFood1 = 2;
    this.food1Chance = 0.5;
    this.meanFood2 = 4;
    this.food2Chance = 0.5;
    this.movementThirstDecay = -1;
    this.movementHungerDecay = -1;
    this.shouldShowImages = true;
    this.foodOneImage = null;
    this.foodTwoImage = null;
    this.waterOneImage = null;
    this.waterTwoImage = null;
    this.hungerUpperBound = 80;
    this.hungerLowerBound = 60;
    this.thirstUpperBound = 75;
    this.thirstLowerBound = 55;
    this.maxMoves = 200;
    this.introDescription = "In this study, you will play a simple game where you will collect food and water.";
    this.beginningTutorialDescription = "You will have 50 moves to practice the game. After you are done, you will begin the game!";
    this.endTutorialDescription = "You have finished the practice round! Click below to start the game!";

    this.setupDefaultImages();
  }

  update(configValues) {
    this.gridRowLength = _.get(configValues, "gridRowLength", 10);
    this.gridColumnLength = _.get(configValues, "gridColumnLength", 10);
    this.initialLoad = _.get(configValues, "initialLoad", 0);
    this.meanWater1 = _.get(configValues, "meanWater1", 2);
    this.water1Chance = _.get(configValues, "water1Chance", 0.5);
    this.meanWater2 = _.get(configValues, "meanWater2", 4);
    this.water2Chance = _.get(configValues, "water2Chance", 0.5);
    this.meanFood1 = _.get(configValues, "meanFood1", 2);
    this.food1Chance = _.get(configValues, "food1Chance", 0.5);
    this.meanFood2 = _.get(configValues, "meanFood2", 4);
    this.food2Chance = _.get(configValues, "food2Chance", 0.5);
    this.movementThirstDecay = _.get(configValues, "movementThirstDecay", -1);
    this.movementHungerDecay = _.get(configValues, "movementHungerDecay", -1);
    this.shouldShowImages = _.get(configValues, "shouldShowImages", true);
    this.foodOneImage = _.get(configValues, "foodOneImage", null);
    this.foodTwoImage = _.get(configValues, "foodTwoImage", null);
    this.waterOneImage = _.get(configValues, "waterOneImage", null);
    this.waterTwoImage = _.get(configValues, "waterTwoImage", null);
    this.hungerUpperBound = _.get(configValues, "hungerUpperBound", 80);
    this.hungerLowerBound = _.get(configValues, "hungerLowerBound", 60);
    this.thirstUpperBound = _.get(configValues, "thirstUpperBound", 75);
    this.thirstLowerBound = _.get(configValues, "thirstLowerBound", 55);
    this.loadRate = _.get(configValues, "loadRate", 2);
    this.shouldRelocateEntity = _.get(configValues, "shouldRelocateEntity", false);
    this.chooseStartingPositionOfEntities = _.get(configValues, "chooseStartingPositionOfEntities", false);
    this.maxMoves = _.get(configValues, "maxMoves", 200);
    this.introDescription = _.get(configValues, "introDescription", "In this study, you will play a simple game where you will collect food and water.");
    this.beginningTutorialDescription = _.get(configValues, "beginningTutorialDescription", "You will have 50 moves to practice the game. After you are done, you will begin the game!");
    this.endTutorialDescription = _.get(configValues, "endTutorialDescription", "You have finished the practice round! Click below to start the game!");


    if(this.chooseStartingPositionOfEntities) {
      this.waterOne = [_.get(configValues, "waterOneXPosition", 0), _.get(configValues, "waterOneYPosition", 0)];
      this.waterTwo = [_.get(configValues, "waterTwoXPosition", 0), _.get(configValues, "waterTwoYPosition", 0)];
      this.foodOne = [_.get(configValues, "foodOneXPosition", 0), _.get(configValues, "foodOneYPosition", 0)];
      this.foodTwo = [_.get(configValues, "foodTwoXPosition", 0), _.get(configValues, "foodTwoYPosition", 0)];
    }

    if (this.foodOneImage == null || this.foodTwoImage == null || this.waterOneImage == null || this.waterTwoImage == null) {
      this.setupDefaultImages();
    }
  }

  isChoosingStartingPosition() {
    return this.chooseStartingPositionOfEntities;
  }

  getStartingEntities() {
    let waterOneData = this.getEntityDataWater1();
    let waterTwoData = this.getEntityDataWater2();
    let foodOneData = this.getEntityDataFood1();
    let foodTwoData = this.getEntityDataFood2();

    let entities = [];

    entities.push(
      {x: this.waterOne[0] , y: this.waterOne[1], data: waterOneData}
    );
    entities.push(
      {x: this.waterTwo[0] , y: this.waterTwo[1], data: waterTwoData}
    );
    entities.push(
      {x: this.foodOne[0] , y: this.foodOne[1], data: foodOneData}
    );
    entities.push(
      {x: this.foodTwo[0] , y: this.foodTwo[1], data: foodTwoData}
    );

    return entities;

  }

  getEntityDataWater1() {
    let randomNum = Math.random();
    let points = this.meanWater1;

    if (randomNum >= this.water1Chance) {
      points = 0;
    }
    return {
      image: this.waterOneImage,
      name: 'W1',
      reward_fn: () => {
        return {
          food: 0,
          water: points,
        }
      },
    }
  }

  getEntityDataWater2() {
    let randomNum = Math.random();
    let points = this.meanWater2;

    if (randomNum >= this.water2Chance) {
      points = 0;
    }
    return {
      image: this.waterTwoImage,
      name: 'W2',
      reward_fn: () => {
        return {
          food: 0,
          water: points,
        }
      },
    }
  }

  getEntityDataFood1() {
    let randomNum = Math.random();
    let points = this.meanFood1;

    if (randomNum >= this.food1Chance) {
      points = 0;

    }
    return {
      image: this.foodOneImage,
      name: 'F1',
      reward_fn: () => {
        return {
          food: points,
          water: 0,
        }
      },
    }
  }

  getEntityDataFood2() {
    let randomNum = Math.random();
    let points = this.meanFood2;

    if (randomNum >= this.food2Chance) {
      points = 0;
    }
    return {
      image: this.foodTwoImage,
      name: 'F2',
      reward_fn: () => {
        return {
          food: points,
          water: 0,
        }
      },
    }
  }

  getMovementThirstDecay() {
    return this.movementThirstDecay;
  }

  getMovementHungerDecay() {
    return this.movementHungerDecay;
  }

  setupDefaultImages() {
    this.foodOneImage = 'assets/Food1.png';
    this.foodTwoImage = 'assets/Food2.png';
    this.waterOneImage = 'assets/Water1.png';
    this.waterTwoImage = 'assets/Water2.png';
  }

  // Num rows in grid
  getGridRowLength() {
    return this.gridRowLength;
  }

  // Num columns in grid
  getGridColumnLength() {
    return this.gridColumnLength;
  }

  // Overall size of grid -width
  getGridSizeWidth() {
    return this.getGridSize() * this.getGridRowLength()
  }

  // OVerall size of grid -height
  getGridSizeHeight() {
    return this.getGridSize() * this.getGridColumnLength()
  }

  getGridSize() {
    var maxRowsColumns = Math.max(this.getGridColumnLength(), this.getGridRowLength())
    return GRID_SIZE_CONSTANT / maxRowsColumns;
  }

  getInitialXPos() {
    return Math.floor(this.getGridRowLength()/2);
  }

  getInitialYPos() {
    return Math.floor(this.getGridColumnLength()/2);
  }

  getHungerLowerBound() {
    return this.hungerLowerBound;
  }

  getHungerUpperBound() {
    return this.hungerUpperBound;
  }

  getInitialHunger() {
    return (this.getHungerLowerBound() + this.getHungerUpperBound()) / 2;
  }

  getThirstLowerBound() {
    return this.thirstLowerBound;
  }

  getThirstUpperBound() {
    return this.thirstUpperBound;
  }

  getInitialThirst() {
    return (this.getThirstLowerBound() + this.getThirstUpperBound()) / 2;
  }

  getInitialLoad() {
    return this.initialLoad;
  }

  getLoadRate() {
    return this.loadRate;
  }

  shouldShowImages() {
    return this.shouldShowImages;
  }

  getWaterOneImage() {
    return this.waterOneImage;
  }

  getWaterTwoImage() {
    return this.waterTwoImage;
  }

  getFoodOneImage() {
    return this.foodOneImage;
  }

  getFoodTwoImage() {
    return this.foodTwoImage;
  }

  getShouldRelocateEntities() {
    return this.shouldRelocateEntity;
  }

  getMaxMoves() {
    return this.maxMoves;
  }

  getIntroDescription() {
    return this.introDescription;
  }

  getBeginningTutorialDescription() {
    return this.beginningTutorialDescription;
  }

  getEndTutorialDescription() {
    return this.endTutorialDescription;
  }

  getConfigurableValues() {
    return  ({
    rowLength: this.gridRowLength,
    columnLength: this.gridColumnLength,
    initialLoad: this.initialLoad,
    loadRate: this.loadRate,
    meanWater1: this.meanWater1,
    varianceWater1: this.varianceWater1,
    meanWater2: this.meanWater2,
    varianceWater2: this.varianceWater2,
    meanFood1: this.meanFood1,
    varianceFood1: this.varianceFood1,
    meanFood2: this.meanFood2,
    varianceFood2: this.varianceFood2,
    movementThirstDecay: this.movementThirstDecay,
    movementHungerDecay: this.movementHungerDecay,
    hungerUpperBound: this.hungerUpperBound,
    hungerLowerBound: this.hungerLowerBound,
    thirstUpperBound: this.thirstUpperBound,
    thirstLowerBound: this.thirstLowerBound,
    shouldRelocateEntity: this.shouldRelocateEntity,
    chooseStartingPositionOfEntities: this.chooseStartingPositionOfEntities,
    maxMoves: this.maxMoves,
    });
  }
}

export default new ConfigurableValuesController();
