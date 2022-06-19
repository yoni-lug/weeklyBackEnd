//USE TWO USE STATE - 1.ORDERS 2. Page 
//in submit change the Page then useeffect  .
// in the use effect change the SetOrder and activate the IsSbmit to show the corret window

import React from 'react';
import {useState,useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios';

import TextField from '@material-ui/core/TextField';
// import { createMuiTheme } from '@material-ui/core/styles';
import artishokImage from "./productPhotos/artishok.jpg"
import pineappleImage from "./productPhotos/pineapple.jpg"
import aviv from "./productPhotos/aviv.jpg"


import { Redirect } from "react-router-dom"
import ShoppingCart from './ShoppingCart';
import { productsList } from './productListArray';

console.log (productsList)


const quantities = ["-", 1 ,2,3,4,5,6,7,8,9,10]

function GridUi(){
    const useStyles = makeStyles((theme) => ({
      
        icon: {
          marginRight: theme.spacing(2),
        },
        heroContent: {
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
          marginTop: theme.spacing(4),
        },
        cardGrid: {
          paddingTop: theme.spacing(5),
          paddingBottom: theme.spacing(5),
        },
        card: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
        cardMedia: {
          paddingTop: '56.25%', // 16:9
        },
        cardContent: {
          flexGrow: 1,
        },
        footer: {
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(6),
        },
        purchaseButton: {
          marginRight: theme.spacing(2),
          padding: theme.spacing(2,2),
        },
      }));
      
      const [count,setCount] = useState (0)
      const [orders,setOrders] = useState ([]);
      const [isSubmitted,setIsSubmitted] =useState(false) 
      
      // const [quantity, setQuantity]=useState([{}])
     
     //PRESENT IN MOUNTING
     useEffect (function(){
       setIsSubmitted (false)
     },[])

     //PRESNT AFTER SUBMIT BUTTON -> ACTIVATE IN THE HANDLE SUBMIT
      useEffect( function(){
        if (count){
          whatToShow() 
        }
          setCount (count+1)    
      }
      , [orders])

      // to show the grid layout of the products or the shopping cart
      function whatToShow(){
        setIsSubmitted (!isSubmitted)   
      }

      //functions read the data from the data base
      //NEED TO CHANGE IT LATER TO READ THE WEEKLY PRODUCT on MOUNT - ONLY ONE TIME WHEN 1ST RENDER
      useEffect( function(){
        axios.get('/findVendorProducts')
        .then(
          function (response) {
          // handle success
          // console.log(response.data);
        })
        .catch(function (error) {
          // handle error
            console.log(error);
          })
      } 
      , [])



      // ADDING quantity to the Array
      //  productsList.map(function(product){
      //   return (
      //   product.quantity=0
      //   )
      //  })
        
      // console.log (productsList)

      let products=productsList
      
  
      function removeOrder (id){
        console.log ("order is removed")
        console.log ("id is : "+id)
        let postRemoveOrders= orders.filter (function (order){
          return (id !== order._id)
        })
        console.log(postRemoveOrders)
          setOrders (postRemoveOrders)
        
      }



      function handleSubmit (event){
        event.preventDefault();  
        console.log ("submit done")
        const id = event.target.id;
        let isOrderExist =orders.some(function(order){
          return (order._id===id)
        })
        console.log (isOrderExist)

        //HANDLE NEW ORDER - Product not exist in the previous orders
       
          const orderArray=products.filter( function (product){
            return (id===product._id)
          })
          const newOrder=orderArray[0];

          if (!isOrderExist) {
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
          console.log (orders)
          console.log (newOrder)
          const preQuantity = parseFloat (orders[index].quantity)
          const newQunatity = parseFloat (newOrder.quantity)
          let totalQnt = preQuantity + newQunatity
          const updateOrders= [...orders]
          updateOrders[index].quantity = totalQnt
          console.log ("update Orders")
          console.log (updateOrders)
          setOrders (updateOrders)
        }
         
      }

       function handleQntChange(event){
         const quantity=event.target.value;
         const id= event.target.id;
        //  const product= products.filter (function (product){
        //    return product._id === id
        //  })
        const index =products.findIndex(function (product){
          return (
             product._id===id
          )
        })
        products.map (function(product){
          if (product._id===id) {
           product.quantity=quantity;
          }
          return(null)
        })
        // console.log(products)
        

// THIS IS A TEST FUNCTION

        function testing(){
          console.log ("test is complted successfuly")
          setIsSubmitted (true)
          return null
        }
//END OF TEST FUNCTION

         
        //  console.log ("is there")
        //  console.log (product)
        //  console.log (event.target)
        //  console.log(id)
        //  console.log(quantity)
       }
     
      const classes = useStyles();
      

      return (
        <div>
         {!isSubmitted && <div >      
            <Container className={classes.cardGrid} maxWidth="lg">
              {/* End hero unit */}
              <Grid container spacing={5}>
                {products.map((product,index) => (      
                  <Grid item key={product._id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <form 
                        onSubmit={handleSubmit}
                        id={product._id}
                        name={product}
                        >
                      <CardMedia
                        id={product._id}
                        className={classes.cardMedia}
                            image={product.productImage}
                    
                           // image="https://source.unsplash.com/random"
                            title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography 
                          id={product._id}
                          className = {classes.typography} 
                          gutterBottom 
                          variant="h5" 
                          component="h2"
                          >
                          {product.productHeader}
                        </Typography>
                        <Typography id={product._id}>
                          {product.productDescription}
                        </Typography>
                        
                      </CardContent>
                      <CardContent>
                        <Typography id={product._id}>
                        מחיר: {product.price}    
                        </Typography>
                        <Typography id={product._id}>
                          עבור: {product.units}  
                        </Typography> 
                      </CardContent>
                      
                      <CardContent>
                          <TextField
                              id={product._id}
                              variant="outlined"
                              label="כמות"
                              onChange={handleQntChange}
                              select
                                SelectProps={{
                                  native: true,
                                }}
                                >
                                {quantities.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                              ))}
                            </TextField>
                            <Button 
                                id={product._id}
                                type="submit"
                                className={classes.purchaseButton} 
                                 size="large" variant="contained"
                                color="primary"
                                
                                >הוסף לסל קניות     
                            </Button>
                        </CardContent>
                      <CardActions>  
                        <Typography style={{position: "relative"}} id={product._id}
                          > {product.vendor} 
                        </Typography>
          
                        <Button
                            id={product._id} 
                            style={{marginRight:"150px"}} 
                            size="small" 
                            color="primary">
                          פרטים נוספים
                        </Button>
                      </CardActions>
                      </form>
                    </Card>
                    
                  </Grid>
                
                ))}
              </Grid>
            </Container>
         
         {/* REDIRECT TO SHOPPING CART */}
          {/* {isSubmitted.status && <Redirect to ={{
            pathname: '/shopping-cart',
            state: { id: isSubmitted.id }
            }} 
            />
         } */}
        </div>}
        <div >
         {isSubmitted && <ShoppingCart shoppingCart={orders} removeOrder={removeOrder} continueShopping={{whatToShow}} />}
        </div> 
         {/* {isSubmitted && <Redirect to={{
           pathname:"/shoppingCart",
           state:{name:"Hila" ,Fname:"Lugassy"},
           fun: function what(){
             console.log ("yehonatan")
             return (null)
           }
           }}/>} */}
      </div>
      );
    }

export default GridUi