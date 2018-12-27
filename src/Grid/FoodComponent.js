import GridComponent from './GridComponent.js'
import GlobalConstants from '../GlobalConstants';

class FoodComponent extends GridComponent {

  componentWillMount() {
    this.label = this.props.foodType === GlobalConstants.FOOD_ONE_GRID_CELL ? 'F1' : 'F2';
  }

}

export default FoodComponent;
