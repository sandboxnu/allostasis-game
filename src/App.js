import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LaunchScreen from './LaunchScreen';
import AdminPanel from './AdminPanel';

function AppRouter() {
    return (
        <Router>
            <div className="App">
                <Route path="/admin" exact component={AdminPanel} />
                <Route path="/" exact component={LaunchScreen} />
            </div>
        </Router>
    );
}

export default AppRouter;
