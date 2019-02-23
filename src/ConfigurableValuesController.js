import _ from 'lodash';

const gaussian = require('gaussian');

class ConfigurableValuesController {
  constructor() {
    this.gridRowLength = 10;
    this.initialLoad = 0; 
    this.loadRate = 2;
    this.meanWater1 = 2;
    this.varianceWater1 = 1;
    this.meanWater2 = 4;
    this.varianceWater2 = 3;
    this.meanFood1 = 2;
    this.varianceFood1 = 1;
    this.meanFood2 = 4;
    this.varianceFood2 = 3;
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

    this.setupDefaultImages();
  }

  update(configValues) {
    this.gridRowLength = _.get(configValues, 'gridRowLength', 10);
    this.initialLoad = _.get(configValues, "initialLoad", 0);
    this.loadRate = _.get(configValues, "loadRate", 2)
    this.meanWater1 = _.get(configValues, "meanWater1", 2);
    this.varianceWater1 = _.get(configValues, "varianceWater1", 1);
    this.meanWater2 = _.get(configValues, "meanWater2", 4);
    this.varianceWater2 = _.get(configValues, "varianceWater2", 3);
    this.meanFood1 = _.get(configValues, "meanFood1", 2);
    this.varianceFood1 = _.get(configValues, "varianceFood1", 1);
    this.meanFood2 = _.get(configValues, "meanFood2", 4);
    this.varianceFood2 = _.get(configValues, "varianceFood2", 3);
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

    if (this.foodOneImage == null || this.foodTwoImage == null || this.waterOneImage == null || this.waterTwoImage == null) {
      this.setupDefaultImages();
    }
  }

  getEntityDataWater1() {
    let distribution = gaussian(this.meanWater1, this.varianceWater1);
    return {
      image: this.waterOneImage,
      name: 'W1',
      reward_fn: () => {
        return {
          food: 0,
          water: distribution.ppf(Math.random()),
        }
      },
    }
  }

  getEntityDataWater2() {
    let distribution = gaussian(this.meanWater2, this.varianceWater2);
    return {
      image: this.waterTwoImage,
      name: 'W2',
      reward_fn: () => {
        return {
          food: 0,
          water: distribution.ppf(Math.random()),
        }
      },
    }
  }

  getEntityDataFood1() {
    let distribution = gaussian(this.meanFood1, this.varianceFood1);
    return {
      image: this.foodOneImage,
      name: 'F1',
      reward_fn: () => {
        return {
          food: distribution.ppf(Math.random()),
          water: 0,
        }
      },
    }
  }

  getEntityDataFood2() {
    let distribution = gaussian(this.meanFood2, this.varianceFood2);
    return {
      image: this.foodTwoImage,
      name: 'F2',
      reward_fn: () => {
        return {
          food: distribution.ppf(Math.random()),
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
    this.foodOneImage = 'assets/treeone.png';
    this.foodTwoImage = 'assets/treetwo.png';
    this.waterOneImage = 'assets/waterone.png';
    this.waterTwoImage = 'assets/watertwo.png';
  }

  getGridRowLength() {
    return this.gridRowLength;
  }

  getGridSize() {
    return 500/this.getGridRowLength();
  }

  getInitialXPos() {
    return Math.floor(this.getGridRowLength()/2);
  }

  getInitialYPos() {
    return Math.floor(this.getGridRowLength()/2);
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

  getConfigurableValues() {
    return  ({
    rowLength: this.gridRowLength,
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
    thirstLowerBound: this.thirstLowerBound
    });
  }
}

export default new ConfigurableValuesController();
