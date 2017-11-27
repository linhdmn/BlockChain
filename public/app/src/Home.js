import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import DrawerOpen from './components/DrawerOpen';
import Paper from 'material-ui/Paper';
import './Dashboard.css';
import axios from 'axios';
import {
    BrowserRouter as Router,    
    Route,
    Link,
    Redirect,
    withRouter
  } from 'react-router-dom';
  import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
var apiBaseUrl = "http://localhost:3001/api/transaction/";

const style = {
    margin: 12,
  };

class Home extends Component{
    constructor(props){
        
        var cols = [];
        cols.push(
            <TableHeader>
                <TableRow>
                <TableHeaderColumn>Sender</TableHeaderColumn>
                <TableHeaderColumn>Receiver</TableHeaderColumn>
                <TableHeaderColumn>Money</TableHeaderColumn>
                </TableRow>
            </TableHeader>
        )
        var items = [];
        super(props);
        this.state={
            login:false,
            register:false,
            transactionData:[],
            cols:cols,
            items:[]
        }
    }
    componentWillMount(){
        var self = this;
        this.setState({
            login:false,
            register:false
        });
        axios({
            method:'get',
            url: apiBaseUrl + 'getAll'
        })
        .then(function(res){
            console.log(res);
            if(res.status==200){
                var items=[];
                var data = res.data;
                console.log(data.length);
                console.log(data[0]);
                for (var i = 0; i < res.data.length; i++){
                    items.push(
                        <TableBody>
                            <TableRow>
                                <TableRowColumn>{data[i].idwalletSender}</TableRowColumn>
                                <TableRowColumn>{data[i].idwalletReceiver}</TableRowColumn>
                                <TableRowColumn>{data[i].money}</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    )
                }
                self.setState({
                    login:false,
                    register:false,
                    transactionData:res.data,
                    items:items
                })
            }
            else{
                console.log("some error ocurred",res.status);
              }
        })
        .catch(function (error) {
            console.log(error);
          });
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
                            <br></br>
                            <Paper zDepth={2}>
                                {this.state.cols}
                                {this.state.items}
                            </Paper>
                        </MuiThemeProvider>
                    </div>
                </div>
            )
        }
        
    }
}

export default Home;