
class ConfigurableValuesController {
  constructor() {
    this.gridRowLength = 10;
    this.numWaterOne = 1;
    this.numWaterTwo = 1;
    this.numFoodOne = 1;
    this.numFoodTwo= 1;
    this.initalHunger = 100;
    this.initialThirst = 100;
    this.initialLoad= 0;
    this.shouldShowImages = true;
    this.foodOneImage = null;
    this.foodTwoImage = null;
    this.waterOneImage = null;
    this.waterTwoImage = null;

    this.setupDefaultImages();
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

  getNumWaterOne() {
    return this.numWaterOne;
  }

  getNumWaterTwo() {
    return this.numWaterTwo;
  }

  getNumFoodOne() {
    return this.numFoodOne;
  }

  getNumFoodTwo() {
    return this.numFoodTwo;
  }

  getInitialXPos() {
    return Math.floor(this.getGridRowLength()/2);
  }

  getInitialYPos() {
    return Math.floor(this.getGridRowLength()/2);
  }

  getInitialHunger() {
    return this.initalHunger;
  }

  getInitialThirst() {
    return this.initialThirst;
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
