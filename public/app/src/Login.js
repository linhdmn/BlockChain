import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import Dashboard from './Dashboard';
import DrawerOpen from './components/DrawerOpen';
import fakeAuth from './auth';

var apiBaseUrl = "http://localhost:3001/api/auth/";
class Login extends Component {
  constructor(props){
    super(props);
    var loginButton=[];
    loginButton.push(
      <div>
      <MuiThemeProvider>
        <div>
           <RaisedButton label={"Register"} primary={true} style={style} onClick={(event) => this.buttonClick(event)}/>
       </div>
       </MuiThemeProvider>
      </div>
    )
    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider>
        <div>
        <TextField
            hintText="Enter your email"
            floatingLabelText="Email"
            onChange = {(event,newValue) => this.setState({username:newValue})}
            />
         <br/>
           <TextField
             type="password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
    )
    this.state={
      message:'',
      loginmessage:'Not registered yet, Register Now',
      username:'',
      password:'',
      loginComponent:localloginComponent,
      loginButton:loginButton,
      register:true,
      logged:false,
      topBar:'Login'
    }
  }
  componentWillMount(){
    var loginmessage = "Not registered yet, Register Now";
    this.setState({
                  loginmessage:loginmessage,
                  register:true,
                  topBar:'Login',
                  logged:this.props.logged
                    })
  }
  buttonClick(e){
    var self = this;
    this.setState({
      register:false 
    })
  }
  handleClick(event){
    var self = this;
    // this.setState({
    //   logged: true
    // })
    if(this.state.username.length>0 && this.state.password.length>0){
      axios({
        method:'post',
        url: apiBaseUrl + 'login',
        data:{
          email: this.state.username,
          password: this.state.password
        }
      })
     .then(function (response) {
       console.log(response);
       if(response.status == 200){
         console.log("Login successfull");
        //  self.setState({
        //    logged: true
        //  });
         fakeAuth.authenticate(() => {
          self.setState({ logged: true })
          });
          localStorage.setItem("email", self.state.username);
         console.log(self.state.logged);
       }
       else if(response.status == 204){
         console.log("Username password do not match");
         self.setState({
           message:"Email or password doesn't right"
         })
         alert(response.data.success)
       }
       else{
         console.log("Username does not exists");
         
        self.setState({
          message:"Email or password wrong!"
        })
         alert("Username does not exist");
       }
     })
     .catch(function (error) {
      self.setState({
        message:"Email or password doesn't right"
      })
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
    }
    
  }
  render() {
    if(this.state.logged){
      return(
        <Redirect to='/dashboard'/>
      )
    }
    else{
      if(this.state.register){
        return (
          <div>
            <MuiThemeProvider>
            <DrawerOpen tittle={this.state.topBar}/>
            </MuiThemeProvider>
            {this.state.loginComponent}
            {this.state.loginmessage}
            {this.state.loginButton}
            {this.state.message}
          </div>
        );
      }
      else{
        return(
          <Redirect to='/register'/>
        )
      }
    }
    
  }
}

const style = {
  margin: 15,
};

export default Login;