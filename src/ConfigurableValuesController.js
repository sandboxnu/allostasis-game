const gaussian = require('gaussian');

class ConfigurableValuesController {
  constructor() {
    this.gridRowLength = 10;
    this.initialLoad = 0;
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
}

export default new ConfigurableValuesController();
