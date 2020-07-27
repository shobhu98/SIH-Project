import React, { Component } from 'react';
import logo from './logo.svg';

import {BrowserRouter,Route, Switch} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";


import MiniDrawer from './components/Drawer'
import HomePage from './components/Homepage'
import PendingFir from './components/PendingFir'

import './App.css';

const styles = ((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


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
  componentDidMount(){
    this.storeCollector()
  }

  storeCollector(){
    let store = JSON.parse(localStorage.getItem('login'))
    if(store && store.login){
      this.setState({
        login:true,
        store:store.token
      })
    }
  }

  login(){
    console.log(JSON.stringify(this.state));
    
    fetch("http://localhost:7000/api/admin_auth",{
      method:"POST",
      headers: {'Content-Type': 'application/json'
    },
      body: JSON.stringify(this.state)
    }).then((response)=>{
      response.json().then((result)=>{
        console.warn("res",result);
        localStorage.setItem('login',JSON.stringify({
          login:true,
          store:result.token
        }))
        this.storeCollector();
      })
    })

  }

  SignInSide() {
    const { classes } = this.props;
  
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
  render(){
    return (
      <div>
        {

          !this.state.login?
          this.SignInSide()
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

export default withStyles(styles, { withTheme: true })(App);
