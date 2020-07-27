import React, { Component } from 'react';
import logo from './logo.svg';

import {BrowserRouter,Route,Switch, Link} from 'react-router-dom'

import MiniDrawer from './components/Drawer'
import HomePage from './components/Homepage'
import PendingFir from './components/PendingFir'

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      email:null,
      password:null,
      uin:null,
      login:false,
      store:null
    }
  }
  login(){
    console.log(JSON.stringify(this.state));
    
    fetch("http://localhost:7000/api/admin_auth",{
      method:"POST",
      headers: {'Content-Type': 'application/json', 'x-auth-token':localStorage.getItem("login").token},
      body: JSON.stringify(this.state)
    }).then((response)=>{
      response.json().then((result)=>{
        console.warn("res",result);
        localStorage.setItem('login',JSON.stringify({
          login:true,
          token:result.token
        }))
        this.setState({
          login:true
        })
      })
    })

  }
  render(){
    return (
      <div>
        {
          !this.state.login?
          <div>
          <input type="text" onChange={(event)=>{this.setState({email:event.target.value})}}></input><br>
          </br>
          <input type="password" onChange={(event)=>{this.setState({password:event.target.value})
        console.log(this.state)}}></input><br>
          </br>
          <input type="number" onChange={(event)=>{this.setState({uin:event.target.value})}}></input><br>
          </br>
          <button onClick={()=>{this.login()}}>Login</button>
        </div>
        :
        <BrowserRouter>
          <MiniDrawer>
            <Switch> 
              <Route path='/' component={HomePage} exact/>
              <Route path='/HomePage' component={HomePage} exact/>
              <Route path='/Pending FIR' component={PendingFir} exact/>
              
            </Switch>
          </MiniDrawer>
        </BrowserRouter>
        }
        
          {/* 
          <BrowserRouter>
          <MiniDrawer>
            <Switch> 
              <Route path='/' component={HomePage} exact/>
              <Route path='/HomePage' component={HomePage} exact/>
              <Route path='/Pending FIR' component={PendingFir} exact/>
              
            </Switch>
          </MiniDrawer>
        </BrowserRouter>
          */}
        
        
      </div>
    );
  }
}

export default App;
