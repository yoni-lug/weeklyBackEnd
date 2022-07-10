//USE TWO USE STATE - 1.ORDERS 2. Page 
//in submit change the Page then useeffect  .
// in the use effect change the SetOrder and activate the IsSbmit to show the corret window

import React from 'react';
import { useEffect, useState } from 'react';
//import {useHistory} from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';




function ProductsGridUi(props){
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
      
      
     
      const classes = useStyles();
      const quantities = ["-","1" ,"2","3","4","5","6","7","8","9","10"]

    

      //DECLARE ALL PROPS PROPERTIES
      const products=props.productsList
      const orders = props.orders
      const setOrders =props.setOrders
      //const  handleSubmit = props.handleSubmit
      const handleQntChange = props.handleQntChange
      const [isSubmitted, setIsSumbitted] = useState (false)

      

     

      //HANDLE SUBMIT PRODUCT TO THE SHOPPING CART - FROM "ProductGridUi"
      function handleSubmit (event){
       
        event.preventDefault();  
        const id = event.target.id; //  THR ID OF THE NEW SUBMIT PRODUCT

        let isOrderExist =orders.some(function(order){
          return (order._id===id)
        })
        
        const orderArray=products.filter( function (product){
            return (id===product._id)
          })
          const newOrder={...orderArray[0]}; //  MANAGING REFERNCE VALUE - CLONE

          //HANDLE NEW ORDER - Product not exist in the previous orders
          if (!isOrderExist) {
            //console.log ("the process is done")
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
        setIsSumbitted (true)
        
    }
      
      return (
        <div>
            {isSubmitted && <Redirect to="./shoppingCart"> </Redirect>}
            
            <Container className={classes.cardGrid} maxWidth="lg">
              {/* End hero unit */}
              <Grid container spacing={5}>
                {products.map((product,index) => (      
                  <Grid item key={product._id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <form 
                        onSubmit={handleSubmit}
                        id={product._id}
                        // name={product}
                       
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
                              //   value="2"
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
      </div>
      );
    }

export default ProductsGridUi