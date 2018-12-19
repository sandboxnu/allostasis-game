
class ConfigurableValuesController {
  static getGridRowLength() {
    return 10;
  }

  static getGridSize() {
    return 500/this.getGridRowLength();
  }
}

export default ConfigurableValuesController;
