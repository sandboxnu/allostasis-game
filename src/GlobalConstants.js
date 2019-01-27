
class GlobalConstants {
    constructor() {
        this.EMPTY_GRID_CELL = 'EMPTY';
        this.WATER_ONE_GRID_CELL = 'WATER_ONE';
        this.WATER_TWO_GRID_CELL = 'WATER_TWO';
        this.FOOD_ONE_GRID_CELL = 'FOOD_ONE';
        this.FOOD_TWO_GRID_CELL = 'FOOD_TWO';
        this.actionEnum = {
	      Start : "start",
	      MovedLeft : "movedLeft",
	      MovedRight : "movedRight",
	      MovedUp : "movedUp",
	      MovedDown : "movedDown"
    	}
    }
}

export default new GlobalConstants();
  