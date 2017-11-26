import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
var apiBaseUrl = "http://localhost:3001/api/auth/";
class DrawerOpen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title:'',
      open: false,
      dashboard: false,
      logout: false,
      home:false,
      btnHome:false,
      logged:false
    };
  }

  componentWillMount(){
    this.setState({
      title:this.props.tittle,
      dashboard:this.props.dashboard,
      home:this.props.home
    })
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleLogout(event){
    var self = this;
    axios({
      method:'get',
      url: apiBaseUrl + 'logout'
    })
   .then(function (response) {
     console.log(response);
     if(response.status == 200){
      console.log("Log out successfull");
      self.setState({
        logout: true
      });
      
    }
     else if(response.status == 204){
       console.log("Username password do not match");
       alert(response.data.success)
     }
     else{
       alert("Username does not exist");
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }

  handleHome = () => this.setState({
    btnHome:true
  })

  render() {
    if(this.state.btnHome){
      return(
        <Redirect to='/'/>
      )
    }
    if(this.state.home){
      return (
        <MuiThemeProvider>
        <div>
          <AppBar 
            title={this.state.title} 
            iconClassNameRight="muidocs-icon-navigation-expand-more" 
          />
          
        </div>
        </MuiThemeProvider>
      );
    }
    if(this.state.logout){
      return(
        <Redirect to='/login'/>
      )
    }
    else{
      if(this.state.dashboard){
        return (
          <MuiThemeProvider>
          <div>
            <AppBar 
              title={this.state.title} 
              iconClassNameRight="muidocs-icon-navigation-expand-more" 
              iconElementRight={<FlatButton label="Log out"/>}
              onLeftIconButtonTouchTap={this.handleToggle}
              onRightIconButtonTouchTap={(event) => this.handleLogout(event)}
            />
            <div>
            <Drawer 
              width={200} 
              open={this.state.open}
              docked={true}
              containerStyle={{height: 'calc(100% - 64px)', top: 64}}
            >
              <MenuItem>Menu Item</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
            </Drawer>
            </div>
          </div>
          </MuiThemeProvider>
        );
      }
      
      else{
        return (
          <MuiThemeProvider>
          <div>
            <AppBar 
              title={this.state.title} 
              iconClassNameRight="muidocs-icon-navigation-expand-more" 
              iconElementRight={<FlatButton label="Home"/>}
              onRightIconButtonTouchTap={this.handleHome}
            />
            
          </div>
          </MuiThemeProvider>
        );
      }
    }
    
    
  }
}
const style = {
  margin: 15
};


export default DrawerOpen;