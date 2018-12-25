import React, { Component } from 'react';
import './GridComponent.css';

class GridComponent extends Component {

  renderLabel() {
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
        {this.renderLabel()}
      </div>
    );
  }
}

export default GridComponent;
