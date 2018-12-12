import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LaunchScreen from './LaunchScreen';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<LaunchScreen />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
