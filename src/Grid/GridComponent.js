import React, { Component } from 'react';
import './GridComponent.css';

class GridComponent extends Component {

  constructor() {
    super();

  }


  render() {
    return (
      <div className="gridComponentOutline" style={{width: this.props.size, height: this.props.size}}>

      </div>
    );
  }
}

export default GridComponent;
