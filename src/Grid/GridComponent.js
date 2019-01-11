import React, { Component } from 'react';
import './GridComponent.css';

class GridComponent extends Component {

  renderBackground() {
    if (!this.label) {
      return null;
    }

    return (
      <div className="gridLabel">
        {this.label}
      </div>
    );
  }

  render() {
    return (
      <div className="gridComponentOutline" style={{width: this.props.size, height: this.props.size}}>
        <div className="gridBackground" style={this.extraStyle}>
          {this.renderBackground()}
        </div>
      </div>
    );
  }
}

export default GridComponent;
