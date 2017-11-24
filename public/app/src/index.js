import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import loginScreen from './components/loginScreen';
  
  class IndexPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loginPage : [],
            uploadScreen:[]
        }
    }
    render() {
      return (
        <div className="index">

        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <IndexPage />,
    document.getElementById('root')
  );
  