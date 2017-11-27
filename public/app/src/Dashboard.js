import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import DrawerOpen from './components/DrawerOpen';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
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

import axios from 'axios';
import './Dashboard.css';
var userURL = "http://localhost:3001/api/account/";
var walletURL= "http://localhost:3001/api/wallet/";
var transactionsURL= "http://localhost:3001/api/transaction/"

const style = {
    margin: 12,
  };

class Dashboard extends Component{
    constructor(props){
        super(props);

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
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Send"
                primary={true}
                keyboardFocused={true}
                onClick={this.handSend}
            />,
        ];
        var dialogSend=[];
        dialogSend.push({

        })
        this.state={
            open: false,
            actions:actions,
            logged:false,
            money:0,
            email:'',
            dialogSend:dialogSend,
            idwallet:'',
            home: false,
            cols: cols,
            items: items
        }
    }

    handleHome= () =>{
        this.setState({
            home:true
        })
    }

    handleOpen = () => {
        this.setState({open: true});
      };
    
    handleClose = () => {
        this.setState({open: false});
      };
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
            self.setState({
                idwallet:idwallet
            })
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
        if(this.state.home){
            return(
                <Redirect to='/'/>
            )
        }
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
                            <RaisedButton style={style} className="button" label="Show all transactions"primary={true} onClick={this.handleHome} />
                        </Paper>
                        <Paper zDepth={1}>
                            <h3>Your balances:</h3>${this.state.money}
                            <h4>Your ID wallet: {this.state.idwallet}</h4>
                        </Paper>

                        <Paper zDepth={1}>
                            <h3>History of transactions</h3>
                            
                        </Paper>
                        <Dialog
                            title="Send money to"
                            actions={this.state.actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                            >
                            <TextField
                                hintText="ID wallet of receiver"
                                floatingLabelText="ID wallet"
                            /><br />
                            <TextField
                                hintText="Money number want to send"
                                floatingLabelText="Money number"
                            /><br />
                        </Dialog>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}

export default Dashboard;