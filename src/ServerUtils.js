import Axios from 'axios';

const SERVER_URL = 'https://api.sandboxneu.com/allostasis-game';

function sendData(collected) {
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
