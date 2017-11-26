import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import DrawerOpen from './components/DrawerOpen';
import Paper from 'material-ui/Paper';
import './Dashboard.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from 'react-router-dom';

var apiBaseUrl = "http://localhost:3001/api/transaction/";

const style = {
    margin: 12,
  };

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            login:false,
            register:false
        }
    }
    componentWillMount(){
        this.setState({
            login:false,
            register:false
        })
    }
    handleLogin(e){
        var self = this;
        this.setState({
            login:true,
            register:false
        })
    }
    handleRegister(e){
        var self = this;
        this.setState({
            register:true,
            login:false
        })
    }
    render(){
        if(this.state.login){
            return(
                <Redirect to='/login'/>
            )
        }
        else if(this.state.register){
            return(
                <Redirect to='/register'/>
            )
        }
        else{
            return(
                <div>
                    <div className="App">
                        <DrawerOpen 
                            tittle = "Home"
                            home={true}
                        />
                    </div>
                    <div className="head">
                        <MuiThemeProvider>
                            <Paper zDepth={1}>
                                <h1>All transaction in system</h1>
                                <RaisedButton style={style} className="button" label="Login" primary={true} onClick={(event) => this.handleLogin(event)} />
                                <RaisedButton style={style} className="button" label="Register"primary={true} onClick={(event) => this.handleRegister(event)} />
                            </Paper>
                        </MuiThemeProvider>
                    </div>
                </div>
            )
        }
        
    }
}

export default Home;