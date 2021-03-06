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
import PurchasingPage from "./customerPage/PurchaingPage";
import PurchasedItemsList from "./vendorPage/purchasedItemsList.jsx";

import Test1 from "./customerPage/Test1"
import { UserProvider } from "../contexts/UserContext.jsx";

import {BasketListProvider} from "../contexts/OrderListContext.jsx";



import axios from "axios";

import {
    createTheme,
    ThemeProvider,
    StyledEngineProvider,
    responsiveFontSizes,
   // adaptV4Theme,
} from '@mui/material/styles';

import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import VendorProductList from "./vendorPage/VendorProductList";


let theme = createTheme(({
  typography: {
    fontFamily: "'Arimo', sans-serif",
  },
  direction: 'ltr'
}))  
theme = responsiveFontSizes(theme);

function App() {
  return (
      <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Router>
            <div>
              {/* <UserProvider>  */}
              
              <BasketListProvider>

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
                            <VendorProductList />
                        </Route>
                        <Route exact path="/shoppingCart" >
                            <ShoppingCart/>
                        </Route>
                        <Route exact path="/purchasingPage" >
                            <PurchasingPage/>
                        </Route>
                        <Route exact path="/purchasedItemsList" >
                            <PurchasedItemsList/>
                        </Route>
                        {/* <Route exact path="/test1" >
                            <Test1/>
                        </Route>
                        <Route exact path="/test" >
                            <Test/>
                        </Route> */}
                    
                    </Switch>

                  </BasketListProvider>
                
              {/* </UserProvider> */}
            </div>
            </Router>
          </ThemeProvider>
      </StyledEngineProvider>
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



