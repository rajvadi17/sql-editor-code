import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.scss';
import { Button} from '@material-ui/core';
import OrderPage from './orderPage'
class MainPage extends Component{
  state = {
    orderPageEnable: true
  }
  // enable state to order page
  handlebtn = () => {
    this.setState({orderPageEnable: false});
  }
  render (){
    const { orderPageEnable } = this.state;
    return(
    <div className="App">
      <header className="App-header">
     { orderPageEnable ? <Button variant="contained" 
            color="primary" 
            className="order-pizza-btn" 
            onClick={this.handlebtn}>
        Order Pizza
      </Button> : <OrderPage/>}
      </header>
    </div>);
  }
}

export default MainPage;
