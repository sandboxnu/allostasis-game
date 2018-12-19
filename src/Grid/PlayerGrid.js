import React, { Component } from 'react';
import './PlayerGrid.css';
import GridComponent from './GridComponent.js'

class PlayerGrid extends GridComponent {

  constructor() {
    super();

  }


  render() {
    return (
      <div className="playerGridOutline" style={{width: this.props.size, height: this.props.size, backgroundColor: '#432122'}}>

      </div>
    );
  }
}

export default PlayerGrid;
