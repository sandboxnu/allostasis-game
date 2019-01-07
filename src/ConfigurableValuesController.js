
class ConfigurableValuesController {
  getGridRowLength() {
    return 15;
  }

  getGridSize() {
    return 500/this.getGridRowLength();
  }

  getNumWaterOne() {
    return 1;
  }

  getNumWaterTwo() {
    return 1;
  }

  getNumFoodOne() {
    return 1;
  }

  getNumFoodTwo() {
    return 1;
  }

  getInitialXPos() {
    return Math.floor(this.getGridRowLength()/2);
  }

  getInitialYPos() {
    return Math.floor(this.getGridRowLength()/2);
  }

  getInitialHunger() {
    return 100;
  }

  getInitialThirst() {
    return 100;
  }

  getInitialLoad() {
    return 0;
  }
}

export default new ConfigurableValuesController();
