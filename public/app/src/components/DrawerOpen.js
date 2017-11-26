import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class DrawerOpen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title:'',
      open: false,
      dashboard: false,
      logout: false
    };
  }

  componentWillMount(){
    this.setState({
      title:this.props.tittle,
      dashboard:this.props.dashboard
    })
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleLogout = () => this.setState({
    logout:true
  })

  render() {
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
              onRightIconButtonTouchTap={this.handleLogout}
            />
            <Drawer width={200} open={this.state.open} >
            
              <AppBar title="Menu" onClick={this.handleToggle} />
              <MenuItem>Menu Item</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
            </Drawer>
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
              onLeftIconButtonTouchTap={this.handleToggle}
            />
            <Drawer width={200} open={this.state.open} >
              <AppBar title="Menu" onClick={this.handleToggle} />
              <MenuItem>Menu Item</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
            </Drawer>
            
          </div>
          </MuiThemeProvider>
        );
      }
    }
    
    
  }
}
const style = {
  margin: 15,
};

export default DrawerOpen;