//USE TWO USE STATE - 1.ORDERS 2. Page 
//in submit change the Page then useeffect  .
// in the use effect change the SetOrder and activate the IsSbmit to show the corret window

import {React, useContext} from 'react';
import {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';

import ShoppingCart from './ShoppingCart';
import { productsList } from './productListArray';
import ProductsGridUi from './ProductsGridUi';

import { basketListContext } from '../../contexts/OrderListContext.jsx';

import {removeBasketList} from "./orderHandling/removeOrder.js"


function GridUi(){

      const {basketList, setBasketList} = useContext (basketListContext)
      const products= productsList // default product list for development
      const [ isMount, setIsMount] = useState(false)
      //const [orders,setOrders] = useState ([]);
      const [isSubmitted,setIsSubmitted] =useState(false) 
      // new part show
      const [show, setShow] = useState ({
        weeklyProductPage : false,
        shoppingCart : false,
        purchasingPage:false
      })
      const [redirect,setRedirect] =useState ({
        shoppingCart: true
      })

     //PRESENT IN MOUNTING
      useEffect (function(){ 
        setIsSubmitted (false);
        setIsMount (true);
      },[])                                                                                   


     //PRESNT AFTER SUBMIT BUTTON -> ACTIVATE IN THE HANDLE SUBMIT
      useEffect( function(){
        if (isMount){
         // whatToShow() 
        }      
        console.log ("GRID UI WHAT TO SHOW")
      }
      , [basketList])

      // to show the grid layout of the products or the shopping cart
      function whatToShow(){
        setIsSubmitted (!isSubmitted)   
      }

      //functions read the data from the data base
      //NEED TO CHANGE IT LATER TO READ THE WEEKLY PRODUCT on MOUNT - ONLY ONE TIME WHEN 1ST RENDER
      // useEffect( function(){
      //   axios.get('/findVendorProducts')
      //   .then(
      //     function (response) {
      //     // handle success
      //     // console.log(response.data);
      //   })
      //   .catch(function (error) {
      //     // handle error
      //       console.log(error);
      //     })
      // } 
      // , [])

      // let products=productsList

      
  // //HANDLE REMOVING ORDER FROM THE SHOPPING CART - FROM "ShoppingCart"
  //     function removeOrder (id){
  //      // console.log ("order is removed")
  //     //console.log ("id is : "+id)
  //       let postRemoveOrders= orders.filter (function (order){
  //         return (id !== order._id)
  //       })
  //       //console.log(postRemoveOrders)
  //         setOrders (postRemoveOrders)
  //     } 
      

// HANDLE QUANTITY CHNAGE - IN ProductsGridUi      
       function handleQntChange(event){
         const qnt=event.target.value;
         const id= event.target.id;
         products.map (function(product,index){
        // INSERT THE QNT FOR THE PRODUCT LIST
          if (product._id === id) {
            product.quantity=qnt
          }
          return (null)
        }) 
      }

      return (
        <div>

         {true && <ProductsGridUi 
            productsList = {products}
            //handleSubmit = {handleSubmit}
            handleQntChange = {handleQntChange}
            basketList = {basketList}
            setBasketList = {setBasketList}
             />}
        <div >
         {false && <ShoppingCart 
            shoppingCart={basketList}
            removeBasketList={removeBasketList} 
            continueShopping={{whatToShow}} />}
        </div> 
      
      </div>
      );
    }

export default GridUi