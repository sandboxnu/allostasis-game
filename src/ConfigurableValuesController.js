
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
}

export default new ConfigurableValuesController();
