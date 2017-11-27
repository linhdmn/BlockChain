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
import './Dashboard.css';var userURL = "http://localhost:3001/api/account/";
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
                <TableHeaderColumn>You</TableHeaderColumn>
                <TableHeaderColumn>Receiver</TableHeaderColumn>
                <TableHeaderColumn>Money</TableHeaderColumn>
                </TableRow>
            </TableHeader>
        )
        var cols2 = [];
        cols2.push(
            <TableHeader>
                <TableRow>
                <TableHeaderColumn>You</TableHeaderColumn>
                <TableHeaderColumn>Sender</TableHeaderColumn>
                <TableHeaderColumn>Money</TableHeaderColumn>
                </TableRow>
            </TableHeader>
        )
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
                onClick={(event)=> this.handleSend(event)}
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
            items: [],
            cols2: cols2,
            items2:[],
            idSend:'',
            moneySend:0
        }
    }

    handleHome= () =>{
        this.setState({
            home:true
        })
    }
    handleSend(e){
        var self = this;
        var items = self.state.items;
        console.log(items);
        if(self.state.idSend.length > 0 
            && self.state.moneySend > 0)
        {
            items.push(
                <TableBody>
                    <TableRow>
                        <TableRowColumn>
                            {self.state.idwallet}
                        </TableRowColumn>
                        <TableRowColumn>
                            {self.state.idSend}
                        </TableRowColumn>
                        <TableRowColumn>
                            {self.state.moneySend}
                        </TableRowColumn>
                    </TableRow>
                </TableBody>
            )
            var moneySending = self.state.moneySend;
            axios({
                method:'post',
                url: transactionsURL,
                data : {
                    sender: self.state.idwallet,
                    receiver: self.state.idSend,
                    money: self.state.moneySend
                }
            })
            .then(function(res){
                if(res.status===200){
                    //update sender money
                    var moneySenderLeft= self.state.money - moneySending;
                    self.setState({
                        money: moneySenderLeft
                    })
                    axios({
                        method: 'put',
                        url: walletURL + 'updateMoney',
                        data:{
                            idwallet: self.state.idwallet,
                            money: self.state.money
                        }
                    })
                    .then(function(res){
                        if(res.status ===200){
                            //get money of receiver
                            axios({
                                method: 'post',
                                url: walletURL ,
                                data:{
                                    idwallet: self.state.idSend
                                }
                            })
                            .then(function(res){
                                if(res.status ===200){
                                    //update money receiver
                                    var moneyReceiverLeft = Number(moneySending) + (res.data[0].accountbalance);
                                    
                                    axios({
                                        method:'put',
                                        url:walletURL + 'updateMoney',
                                        data:{
                                            idwallet: self.state.idSend,
                                            money: moneyReceiverLeft
                                        }
                                    })
                                    .then(function(res){
                                        if(res.status === 200){
                                            console.log(res);
                                            
                                        }
                                    });
                                    self.setState({
                                        open: false,
                                        items:items
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
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
        // console.log(email);
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
        //    console.log(response);
           if(response.status == 200){
            //  console.log("registration successfull");
            idwallet = response.data[0].idwallet;
            self.setState({
                idwallet:idwallet
            })
            axios({
                method:'post',
                url: walletURL,
                data:{
                    idwallet:idwallet
                }
            })
            .then(function(res){
                // console.log(res);
                if(res.status==200){
                    balances = res.data[0].accountbalance;
                    self.setState({
                        money: balances
                    })
                    console.log(idwallet);
                    axios({
                        method:'post',
                        url:transactionsURL + 'findSentByUser',
                        data:{
                           idwallet:idwallet
                        }
                    })
                    .then(function(res){
                        if(res.status===200){
                            var items=[];
                            var data = res.data;
                            for(var i = 0; i < data.length; i++){
                                items.push(
                                    <TableBody>
                                        <TableRow>
                                            <TableRowColumn>
                                               {data[i].idwalletSender}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                               {data[i].idwalletReceiver}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                               {data[i].money}
                                            </TableRowColumn>
                                        </TableRow>
                                   </TableBody>
                                )
                            }
                            self.setState({
                                items: items
                            })
                            console.log(self.state.items);
                        }
                    });
                    axios({
                        method:'post',
                        url:transactionsURL + 'findReceiveByUser',
                        data:{
                           idwallet:idwallet
                        }
                    })
                    .then(function(res){
                        if(res.status===200){
                            var items=[];
                            var data = res.data;
                            for(var i = 0; i < data.length; i++){
                                items.push(
                                    <TableBody>
                                        <TableRow>
                                            <TableRowColumn>
                                               {data[i].idwalletReceiver}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                               {data[i].idwalletSender}
                                            </TableRowColumn>
                                            <TableRowColumn>
                                               {data[i].money}
                                            </TableRowColumn>
                                        </TableRow>
                                   </TableBody>
                                )
                            }
                            self.setState({
                                items2: items
                            })
                            console.log(self.state.items2);
                        }
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
                        <Paper zDepth={2}>
                            <h3>History of Sending</h3>
                            {this.state.cols}
                            {this.state.items}
                        </Paper>
                        <Paper zDepth={2}>
                            <h3>History of Receiving</h3>
                            {this.state.cols2}
                            {this.state.items2}
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
                                onChange = {(event, newValue) => this.setState({idSend:newValue})}
                            /><br />
                            <TextField
                                hintText="Money number want to send"
                                floatingLabelText="Money number"
                                onChange = {(event, newValue) => this.setState({moneySend:newValue})}
                            /><br />
                        </Dialog>
                    </MuiThemeProvider>
                </div>
            </div>
        )
    }
}

export default Dashboard;