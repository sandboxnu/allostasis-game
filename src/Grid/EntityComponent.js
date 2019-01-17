import React from 'react';
import GridComponent from './GridComponent.js'
import './GridComponent.css';

class EntityComponent extends GridComponent {

  componentWillMount() {
    this.label = this.props.name;
    this.background = this.props.image;
    if (!this.shouldRenderImage()) {
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

export default EntityComponent;
