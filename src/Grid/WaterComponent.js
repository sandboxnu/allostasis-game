import GridComponent from './GridComponent.js'
import GlobalConstants from '../GlobalConstants';

class WaterComponent extends GridComponent {

  componentWillMount() {
    this.label = this.props.waterType === GlobalConstants.WATER_ONE_GRID_CELL ? 'W1' : 'W2';
  }

}

export default WaterComponent;
