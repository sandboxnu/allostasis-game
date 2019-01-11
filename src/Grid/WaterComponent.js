import React from 'react';
import GridComponent from './GridComponent.js'
import GlobalConstants from '../GlobalConstants';
import ConfigurableValuesController from '../ConfigurableValuesController.js';
import './GridComponent.css';

class WaterComponent extends GridComponent {

  componentWillMount() {
    this.label = this.props.waterType === GlobalConstants.WATER_ONE_GRID_CELL ? 'W1' : 'W2';
    this.background = this.props.waterType === GlobalConstants.WATER_ONE_GRID_CELL ? ConfigurableValuesController.getWaterOneImage() : ConfigurableValuesController.getWaterTwoImage();

    if (!this.shouldRenderImage()){
      this.extraStyle = {
        backgroundColor: '#40ccff',
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

export default WaterComponent;
