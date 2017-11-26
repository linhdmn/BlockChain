import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import Dashboard from './Dashboard';
import DrawerOpen from './components/DrawerOpen';
import Login from './Login';

var apiBaseUrl = "http://localhost:3001/api/auth/register";

class Register extends Component{
  constructor(props){
    super(props);
    var loginButton=[];
    loginButton.push(
      <div>
      <MuiThemeProvider>
        <div>
           <RaisedButton label={"Login"} primary={true} style={style} onClick={(event) => this.buttonClick(event)}/>
       </div>
       </MuiThemeProvider>
      </div>
    )
    var registerComponent=[];
    var userhintText;
    userhintText="Enter your email"
    registerComponent.push(
      <div>
      <MuiThemeProvider>
        <div>
        <DrawerOpen
           tittle="Register"
         />
         <TextField
           hintText={userhintText}
           floatingLabelText="Your email"
           onChange = {(event,newValue) => this.setState({email:newValue})}
           />
         <br/>
         <TextField
           type = "password"
           hintText="Enter your Password"
           floatingLabelText="Password"
           onChange = {(event,newValue) => this.setState({password:newValue})}
           />
         <br/>
         <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
        </div>
       </MuiThemeProvider>
    </div>
    )
    this.state={
      loginmessage:'Already registered.Go to Login',
      email:'',
      password:'',
      loginButton:loginButton,
      registerComponent:registerComponent,
      login:true,
    }
  }
  buttonClick(e){
    var self = this;
    this.setState({
      login:false
    })
  }
  handleClick(event){
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if(this.state.email.length>0 && this.state.password.length>0){
      axios({
        method: 'post',
        url: apiBaseUrl + 'register',
        data: {
          email: this.state.email,
          password: this.state.password
        }
      })
     .then(function (response) {
       console.log(response);
       if(response.status == 200){
        //  console.log("registration successfull");
         var loginscreen=[];
         loginscreen.push(<Login parentContext={this} appContext={self.props.appContext}/>);
         var loginmessage = "Not Registered yet.Go to registration";
         self.props.parentContext.setState({loginscreen:loginscreen,
         loginmessage:loginmessage,
         buttonLabel:"Register",
         isLogin:true
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
    else{
      alert("Input field value is missing");
    }

  }
  render() {
    if(this.state.login){
      return (
        <div>
          {this.state.registerComponent}
          {this.state.loginmessage}
          {this.state.loginButton}
        </div>
      );
    }
    else{
      return(
        <Redirect to='/login'/>
      )
    }
    console.log("props",this.props);
    
  }
}

const style = {
  margin: 15,
};

export default Register;