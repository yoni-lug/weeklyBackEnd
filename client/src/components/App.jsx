import React, { useState } from "react";
import Footer from "./customerPage/Footer";

import GridUi from "./customerPage/GridUi"
import HeaderUi from "./customerPage/HeaderUi"
import SignIn from "./signPages/SignIn"
import SignUp from "./signPages/SignUp"
import What from "./customerPage/What"
import VendorInputHeader from "./vendorPage/VendorInputHeader"
import InsertProduct from "./vendorPage/InsertProduct";
import ShoppingCart from "./customerPage/ShoppingCart";
import Test from "./customerPage/Test";



import axios from "axios";

import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';

import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import DataTable from "./vendorPage/DataTable";


let theme = createMuiTheme({
  typography: {
    fontFamily: "'Arimo', sans-serif",
  }
})
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
    <div>
    <Switch>
    <Route exact path="/"> 
        <HeaderUi /> 
        <GridUi/>
        <Footer /> 
      </Route>  
      <Route exact path="/vendor">
        <VendorInputHeader />
        <InsertProduct/> 
      </Route> 
      <Route exact path="/signin">
          <SignIn />
      </Route>
      <Route exact path="/signup">
          <SignUp />
      </Route>
      <Route exact path="/vendorProductList">
          <DataTable />
      </Route>
      <Route exact path="/shoppingCart" >
          <Test/>
      </Route>

     
    </Switch>
      
    </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;

// function handleGet(){
//   axios.get('/vendor')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
// }

// function handlePost(){
//   console.log ("yes")
//   axios.post('/vendor', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   })
//   .then(function (response) {
//     console.log("post")
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }



