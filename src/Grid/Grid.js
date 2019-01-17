import React, { Component } from 'react';
import './Grid.css';
import GridComponent from './GridComponent.js';
import ConfigurableValuesController from '../ConfigurableValuesController.js';
import GlobalConstants from '../GlobalConstants.js';
import EntityComponent from './EntityComponent.js';
import PlayerGrid from './PlayerGrid.js';

class Grid extends Component {

  constructor() {
    super();
    this.state = {
      randomVariable: true
    }

  }

  isPlayerObject(gridval) {
  
  }

  isWaterObject(gridVal) {
    return gridVal === GlobalConstants.WATER_ONE_GRID_CELL || gridVal === GlobalConstants.WATER_TWO_GRID_CELL;
  }

  isFoodObject(gridVal) {
    return gridVal === GlobalConstants.FOOD_ONE_GRID_CELL || gridVal === GlobalConstants.FOOD_TWO_GRID_CELL;
  }

  // Returns a list of the entities at the given coordinates
  getEntitiesAt(x, y, entities) {
    return entities.filter(e => e.x === x && e.y === y);
  }

  renderGrid() {
    let gridObjects = [];
    const gridRowLength = ConfigurableValuesController.getGridRowLength();
    const size = ConfigurableValuesController.getGridSize();

    for (let y = 0; y < gridRowLength; y++) {
      for(let x = 0; x < gridRowLength; x++) {
        let curEntities = this.getEntitiesAt(x, y, this.props.entities);
        if(curEntities.length !== 0) {
          let curEntity = curEntities[0];
          gridObjects.push(<EntityComponent
                             size={size}
                             name={curEntity.data.name}
                             image={curEntity.data.image}
                             x={x}
                             y={y}
                             key={x + ' ' + y}/>);
        } else {
          gridObjects.push(<GridComponent
                              size={size}
                              x={x}
                              y={y}
                              key={x + ' ' + y}/>);
        }
      }
    }

    return gridObjects;
  }

  renderPlayer() {
    return <PlayerGrid
              size = {ConfigurableValuesController.getGridSize()}
              xPos = {this.props.playerX}
              yPos = {this.props.playerY}/>;
  }

  render() {
    return (
      <div className="gridOutline">
        {this.renderGrid()}
        {this.renderPlayer()}
      </div>
    );
  }
}

export default Grid;
