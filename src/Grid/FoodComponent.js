import React from 'react';
import GridComponent from './GridComponent.js'
import GlobalConstants from '../GlobalConstants';
import ConfigurableValuesController from '../ConfigurableValuesController.js';
import './GridComponent.css';

class FoodComponent extends GridComponent {

  componentWillMount() {
    this.label = this.props.foodType === GlobalConstants.FOOD_ONE_GRID_CELL ? 'F1' : 'F2';
    this.background = this.props.foodType === GlobalConstants.FOOD_ONE_GRID_CELL ? ConfigurableValuesController.getFoodOneImage() : ConfigurableValuesController.getFoodTwoImage();
    if (!this.shouldRenderImage()){
      this.extraStyle = {
        backgroundColor: '#10b301',
      }
    };

  }

  renderBackground() {
    if (this.shouldRenderImage()){
      let bgImg = this.background.startsWith('assets') ? require("../" +this.background) : this.background;
      
      return (
        <div className="gridImage">
          <img src={bgImg} alt="" className="profileImg" />
        </div>
      );
    }

    return (
      <div className="gridLabel">
        {this.label}
      </div>
    );
  }

  shouldRenderImage() {
    return this.background != null;
  }

}

export default FoodComponent;
