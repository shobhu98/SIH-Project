import React from 'react';
import logo from './logo.svg';

import {BrowserRouter,Route,Switch, Link} from 'react-router-dom'

import MiniDrawer from './components/Drawer'
import HomePage from './components/Homepage'
import PendingFir from './components/PendingFir'

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MiniDrawer>
        <Switch>
          <Route path='/' component={HomePage} exact/>
          <Route path='/HomePage' component={HomePage} exact/>
          <Route path='/Pending FIR' component={PendingFir} exact/>
          
        </Switch>
      </MiniDrawer>
    </BrowserRouter>
  );
}

export default App;
