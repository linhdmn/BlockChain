import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import DrawerOpen from './components/DrawerOpen';
import './Dashboard.css'

var apiBaseUrl = "http://localhost:3001/api/auth/";

class Dashboard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div className="App">
                    <DrawerOpen 
                        tittle = "Dashboard" dashboard={true}
                    />
                </div>
                <h1>BE YOUR OWN BANK</h1>
            </div>
        )
    }
}

export default Dashboard;