import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Paper} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Icon  from '@material-ui/core/Icon';
const classes = (theme) => ({
    root: {
      padding: theme.spacing(3, 2),
      width: '50%',
      height: '50%'
    },
  });
  const smallCost = 150;
  const mediumCost = 200;
  const largeCost = 300;
  const MaxTotal = 1000;
  const MinTotal = 200;
class OrderPage extends Component{
  state = {
    small: 0,
    medium: 1,
    large: 0,
    adults: 1,
    children: 0,
    totalCost: 200,
    incrementedType: null
  }
  
 

  addSmall = () => {
    let totalCost = this.state.small * smallCost + this.state.medium * mediumCost + 
                    this.state.large * largeCost +150;
    if( totalCost <= MaxTotal) {
    this.setState({small: this.state.small +1,
      children: this.state.children +1, incrementedType: "small"});
    }
    // this.this.calculateTotal();
  }

  addMedium = () => {
    let totalCost = this.state.small * smallCost + this.state.medium  * mediumCost + 
                    this.state.large * largeCost +200;
    if(totalCost <= MaxTotal) {
    this.setState({medium: this.state.medium +1,
    adults: this.state.adults +1,
    incrementedType: "medium"});
    }
    // this.this.calculateTotal();
  }

  addLarge = () => {
    let totalCost = this.state.small * smallCost + this.state.medium  * mediumCost + 
                    this.state.large  * largeCost +300;
    if(totalCost <= MaxTotal) {
    this.setState({large: this.state.large +1,
    adults: this.state.adults +2,
    incrementedType: "large"});
    }
    // this.this.calculateTotal();
  }

  addChild = () => {
    let totalCost = this.state.small* smallCost + this.state.medium * mediumCost + 
                    this.state.large * largeCost + 150;
    if(totalCost <= MaxTotal) {
    this.setState({small: this.state.small + 1,
    children: this.state.children +1});
    }
  }

  addAdult = () => {
    let totalCost = this.state.small * smallCost + this.state.medium  * mediumCost + 
                    this.state.large * largeCost + 200;
    if(totalCost <= MaxTotal) {
    this.setState({medium: this.state.medium + 1,
      adults: this.state.adults +1});
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(this.state.small !== prevState.small || 
      this.state.medium !== prevState.medium || 
      this.state.large!== prevState.large){
        debugger;
        let small = this.state.small;
        let medium = this.state.medium;
        let large = this.state.large;
        if(this.state.incrementedType == "small"){
         small = small > 2 ? small % 2 : small;
     medium = this.state.small > 2 ?  medium + ~~(this.state.small / 2) : medium;
        } else if(this.state.incrementedType == "medium"){
    medium = medium > 2 ?   medium % 2 : medium;
    large =this.state.medium > 2 ?  large + ~~(this.state.medium / 2) : large;
        }
    this.setState({small, medium, large});
      }
  }

  removeSmall = () => {
    let totalCost = this.state.small * smallCost + this.state.medium * mediumCost + 
                    this.state.large * largeCost - 150;
    if(totalCost >= MinTotal && this.state.small >= 0) {
      this.setState({small: this.state.small -1,
      children: this.state.children -1})
    }
  }

  removeMedium = () => {
    let totalCost = this.state.small * smallCost + this.state.medium * mediumCost + 
                    this.state.large * largeCost - 200;
    if(totalCost >= MinTotal && this.state.medium >= 0) {
      let adults = this.state.adults, children = this.state.children;
      if(this.state.adults >= 1) {
         adults = this.state.adults - 1;
      } else {
        children = this.state.children -2;
      }
      this.setState({medium: this.state.medium -1,
      adults, children});
    }
  }

  removeLarge = () => {
    let totalCost = this.state.small * smallCost + this.state.medium * mediumCost + 
                    this.state.large * largeCost - 300;
    if(totalCost >= MinTotal && this.state.large >= 0) {
      let adults = this.state.adults , children = this.state.children;
      if(this.state.adults >= 2) {
        adults = this.state.adults - 2;
      } else {
         children = this.state.children -2;
      }
      this.setState({medium: this.state.medium -1,
      adults, children});
    }
  }
  calculateTotal = () => {
    
    let totalCost = this.state.small * smallCost + this.state.medium * mediumCost + 
                    this.state.large * largeCost;
                    
    return totalCost;
    
  }
  render (){
    return(
            <Paper className="order-pizza">
                <h3 className="pizza-tag">
                    Order Pizza
                </h3>
                <div className="order-pizza-div">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <i className = "material-icons">local_pizza</i>
                    SMALL
                    <Icon color="primary" onClick={this.removeSmall}>remove_circle</Icon>
                    {this.state.small}
                    <Icon color="secondary" onClick={this.addSmall}>add_circle</Icon>
                    </Grid>
                    <Grid item xs={12}>
                    <i className = "material-icons">local_pizza</i>
                    MEDIUM
                    <Icon color="primary" onClick={this.removeMedium}>remove_circle</Icon>
                    {this.state.medium}
                    <Icon color="secondary" onClick={this.addMedium}>add_circle</Icon>
                    </Grid>
                    <Grid item xs={12}>
                    <i className = "material-icons">local_pizza</i>
                    LARGE
                    <Icon color="primary" onClick={this.removeLarge}>remove_circle</Icon>
                    {this.state.large}
                    <Icon color="secondary" onClick={this.addLarge}>add_circle</Icon>
                    </Grid>
                    <hr/>
                    <Grid item xs={12}>
                    ADULTS
                    <Icon color="primary">remove_circle</Icon>
                    {this.state.adults}
                    <Icon color="secondary" onClick={this.addAdult}>add_circle</Icon>
                    </Grid>
                    <hr/>
                    <Grid item xs={12}>
                    CHILDREN
                    <Icon color="primary">remove_circle</Icon>
                    {this.state.children}
                    <Icon color="secondary" onClick={this.addChild}>add_circle</Icon>
                    </Grid>
                 </Grid>
                </div>
                Order Total {this.calculateTotal()}
            </Paper>);
  }
}

export default OrderPage;