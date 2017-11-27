import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import DrawerOpen from './components/DrawerOpen';
import Paper from 'material-ui/Paper';

import axios from 'axios';
import './Dashboard.css';
var userURL = "http://localhost:3001/api/account/";
var walletURL= "http://localhost:3001/api/wallet/";

const style = {
    margin: 12,
  };

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state={
            logged:false,
            money:0,
            email:''
        }
    }
    componentWillMount(){
        var self = this;
        var email = localStorage.getItem("email");
        console.log(email);
        var balances=0;
        var idwallet;
        axios({
            method: 'post',
            url: userURL + 'find',
            data: {
              email: email
            }
          })
         .then(function (response) {
           console.log(response);
           if(response.status == 200){
            //  console.log("registration successfull");
            idwallet = response.data[0].idwallet;
            console.log(idwallet);
            axios({
                method:'post',
                url: walletURL,
                data:{
                    idwallet:idwallet
                }
            })
            .then(function(res){
                console.log(res);
                if(res.status==200){
                    balances = res.data[0].accountbalance;
                    self.setState({
                        money: balances
                    })
                }
                else{
                    console.log("some error ocurred",response.status);
                  }
            })
            .catch(function (error) {
                console.log(error);
              });
           }
           else{
             console.log("some error ocurred",response.status);
           }
         })
         .catch(function (error) {
           console.log(error);
         });
    }
    render(){
        return(
            <div>
                <div className="App">
                    <DrawerOpen 
                        tittle = "Dashboard" dashboard={true}
                    />
                </div>
                <div className="head">
                    <MuiThemeProvider>
                        <Paper zDepth={1}>
                            <h1>BE YOUR OWN BANK</h1>
                            <RaisedButton style={style} className="button" label="Send" primary={true} onClick={this.handleOpen} />
                            <RaisedButton style={style} className="button" label="Show all transactions"primary={true} onClick={this.handleOpen} />
                        </Paper>
                        <Paper zDepth={1}>
                            <h3>Your balances:</h3>${this.state.money}
                        </Paper>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}

export default Dashboard;