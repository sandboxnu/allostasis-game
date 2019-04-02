import Axios from 'axios';
import React from 'react';


const SERVER_URL = 'https://api.sandboxneu.com/test/';

class ServerUtils {
  sendData(collected) {
    const time = Math.floor(new Date().getTime() / 1000);
    const file = new File([JSON.stringify(collected)], `${time}.json`);

    const formData = new FormData();
    formData.append('file', file);

    // Using axios http lib to send post request with formdata.
    // fetch, xmlhttprequest, jquery etc. could also be used.
    Axios.post(`${SERVER_URL}/data`, formData)
      .then((response) => {
        console.log(response);
      })
     .catch(error => console.log(error));
  }

  getServerUrl() {
    return SERVER_URL;
  }

  sendDefaultJson() {
    return {
      "gridRowLength": 10,
      "initialLoad": 0,
      "loadRate": 2,
      "meanWater1": 2,
      "varianceWater1": 1,
      "meanWater2": 4,
      "varianceWater2": 3,
      "meanFood1": 2,
      "varianceFood1": 1,
      "meanFood2 ": 4,
      "varianceFood2": 3,
      "movementThirstDecay": -1,
      "movementHungerDecay": -1,
      "shouldShowImages": true,
      "foodOneImage": null,
      "foodTwoImage": null,
      "waterOneImage": null,
      "waterTwoImage": null,
      "hungerUpperBound": 80,
      "hungerLowerBound": 60,
      "thirstUpperBound": 75,
      "thirstLowerBound": 55
    };
  }
}

export default new ServerUtils();
