//USE TWO USE STATE - 1.ORDERS 2. Page 
//in submit change the Page then useeffect  .
// in the use effect change the SetOrder and activate the IsSbmit to show the corret window

import React from 'react';
import {useState,useEffect} from 'react';

import ShoppingCart from './ShoppingCart';
import { productsList } from './productListArray';
import ProductsGridUi from './ProductsGridUi';


function GridUi(){

      const products= productsList // default product list for development
      const [count,setCount] = useState (0) 
      const [orders,setOrders] = useState ([]);
      const [isSubmitted,setIsSubmitted] =useState(false) 

     //PRESENT IN MOUNTING
     useEffect (function(){ setIsSubmitted (false)},[])

     //PRESNT AFTER SUBMIT BUTTON -> ACTIVATE IN THE HANDLE SUBMIT
      useEffect( function(){
        if (count){
          whatToShow() 
          console.log ("order 0 quanatity is: "+ orders[0].quantity)
        }
          setCount (count+1)
          console.log("order is changed - not in render")    
      }
      , [orders])

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

  
      useEffect (function(){
        console.log ("product change in the use effect see products below")
        console.log(products)
        console.log (" see the orderList below")
        console.log (orders)
      },[products])
      
  //HANDLE REMOVING ORDER FROM THE SHOPPING CART - FROM "ShoppingCart"
      function removeOrder (id){
        console.log ("order is removed")
        console.log ("id is : "+id)
        let postRemoveOrders= orders.filter (function (order){
          return (id !== order._id)
        })
        console.log(postRemoveOrders)
          setOrders (postRemoveOrders)
      }

//HANDLE SUBMIT PRODUCT TO THE SHOPPING CART - FROM "ProductGridUi"
      function handleSubmit (event){
       
        event.preventDefault();  
        const id = event.target.id; //  THR ID OF THE NEW SUBMIT PRODUCT

        let isOrderExist =orders.some(function(order){
          return (order._id===id)
        })
        console.log( "is order exist")
        console.log (isOrderExist)
       
        console.log ("SHOW PRODUCTS") 
        console.log(products)
        
        const orderArray=products.filter( function (product){
            return (id===product._id)
          })
          const newOrder={...orderArray[0]}; //  MANAGING REFERNCE VALUE - CLONE

          //HANDLE NEW ORDER - Product not exist in the previous orders
          if (!isOrderExist) {
            console.log ("the process is done")
            setOrders (function(prevOrders){
              return(
              [...prevOrders,newOrder]
            )
            })
          }

          //HANDLE exist ORDER - Product Exist
        if (isOrderExist) {
          let index=orders.findIndex (function (order){
           return (id===order._id)
          })
         
          const preQuantity = parseFloat (orders[index].quantity)
          const newQunatity = parseFloat (newOrder.quantity)
          let totalQnt = preQuantity + newQunatity
          orders[index].quantity = totalQnt
          setOrders ([...orders])
        }
        
        products.map (function (product){
          product.quantity = 0
          return null
        }) 
        
     
        
    }

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
         {!isSubmitted && <ProductsGridUi 
            productsList = {products}
            handleSubmit = {handleSubmit}
            handleQntChange = {handleQntChange}
             />}
        <div >
         {isSubmitted && <ShoppingCart 
            shoppingCart={orders}
            removeOrder={removeOrder} 
            continueShopping={{whatToShow}} />}
        </div> 
      
      </div>
      );
    }

export default GridUi