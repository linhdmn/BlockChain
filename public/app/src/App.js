import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Home from './Home';
import fakeAuth from './auth'; 

const style = {
  margin: 15,
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
const App = () =>{
  return (
    <Router>
    <div>
      <div className="App">
        <Route exact path="/" exact component={Home}/>
      </div>
      <div className="App">
        <Route path="/login" exact component={Login}/>
      </div>
      <div className="App">
        <Route path="/register" exact component={Register}/>
      </div>
      <PrivateRoute exact path="/dashboard" component={Dashboard}/>
    </div>
    </Router>
  );
}
// class App extends Component{
//   render() {
//     return (
//       <Router>
//       <div className="App">
//         <Route exact path="/" component={Login}/>
//         <Route path="/login" component={Login}/>
//         <Route path="/register" component={Register}/>
//       </div>
//       </Router>
//     );
//   }
// }


export default App;