import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Wizard_1 from './components/Wizard_1';
import Wizard_2 from './components/Wizard_2';
import Wizard_3 from './components/Wizard_3';
import Wizard_4 from './components/Wizard_4';
import Wizard_5 from './components/Wizard_5';
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Auth}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/wizard/1" component={Wizard_1}/>
            <Route path="/wizard/2" component={Wizard_2}/>
            <Route path="/wizard/3" component={Wizard_3}/>
            <Route path="/wizard/4" component={Wizard_4}/>
            <Route path="/wizard/5" component={Wizard_5}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
