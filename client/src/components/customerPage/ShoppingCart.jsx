    import {React,useContext, useState} from 'react';
    import { makeStyles } from '@material-ui/core/styles';
    import Card from '@material-ui/core/Card';
    
    import CardActions from '@material-ui/core/CardActions';
    import CardContent from '@material-ui/core/CardContent';
    import CardMedia from '@material-ui/core/CardMedia';
    import Button from '@material-ui/core/Button';
    import Typography from '@material-ui/core/Typography';
   
    import Grid from '@material-ui/core/Grid';
    import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
    import IconButton from '@material-ui/core/IconButton';
    import {basketListContext} from "../../contexts/OrderListContext.jsx"

    import { Redirect } from 'react-router-dom';

    //import { useLocation } from 'react-router-dom';

    //import {removeOrder} from "./orderHandling/removeOrder.js"
    
    
    const useStyles = makeStyles((theme) => ({
      root: {
        maxWidth: 600,
        margin:"8px auto 8px auto",
       
      },
      media: {
        height: 100,
        // width:"30%",
        // display:"inline-block",
        margin:"16px"
      },
      content:{
        padding:"8px 16px 8px 16px",
        // width :"45%",
        // display:"inline-block"
        position: "relative"
      },
      buttomDiv:{
        textAlign:"center",
        margin: "16px auto ", 
      },
      buttom:{
      margin: theme.spacing(1),
      }
    }));
    
    export default function ShoppingCart(props) {
      const classes = useStyles();
    // const location = useLocation();
     //const orders=location.state.orders
     //const orders=props.shoppingCart
     const {basketList,setBasketList} = useContext(basketListContext)
     console.log (basketList)
     console.log (setBasketList)
     const [isRedirectShopping, setIsRedirectShopping]= useState (false)
     const [IsRedirectPurchasing,SetIsRedirectPurchasing] =useState (false)
  
   
      console.log("this is the shopping Cart")
      console.log(basketList)
    

       //HANDLE REMOVING ORDER FROM THE SHOPPING CART - FROM "ShoppingCart"
       function handleRemoveClick (id,event){
         console.log ("order is removed")
      
         let postRemoveItems= basketList.filter (function (basketItem){
           return (id !== basketItem._id)
         })
         //console.log(postRemoveOrders)
           setBasketList (postRemoveItems)
       } 
      

      function handleContinueShopping (){
        // console.log("contineShopping")
        setIsRedirectShopping (true)
        return null

        }
        function handleContinueToPurchasing(){
          SetIsRedirectPurchasing (true)
          console.log ("continueToPurchasing")
        }
      
        return (
        <div className={classes.root}>

        {isRedirectShopping && <Redirect to="/"></Redirect>}
        {IsRedirectPurchasing && <Redirect to="./PurchasingPage"></Redirect>}
        
        {/* BUTTOMS PART */}
         <div className={classes.buttomDiv }>
         <Button onClick={handleContinueToPurchasing} className={classes.buttom} variant="contained">
           לסיום הזמנה
           </Button>
          <Button className={classes.buttom} variant="contained" 
          onClick ={handleContinueShopping}
          style={{backgroundColor:"#8bc34a"}}>
            להמשך קניות
          </Button> 
         </div> 
        {/* END OF BUTTOMS PART */}

                
        <Card >
        {basketList.map (function (basketItem,index){
        console.log("index is: "+index)
         return(
        
        
        <div className={classes.root} key={index}>
        
      

        {/* <CardActionArea > */}
        <Grid container>
         <Grid item xs={3}>
          
            <CardMedia
              className={classes.media}
              image="https://applemagazine.com/wp-content/uploads/2021/09/146898-phones-feature-the-best-apple-iphone-photos-ever-taken-image1-ydter7skel.jpg"
              title="Contemplative Reptile"
            />
         </Grid>
         <Grid item xs={9}>
            <CardContent className={classes.content}>
            <IconButton
             onClick ={function(event){
               return (
                 handleRemoveClick(basketItem._id,event)
               )
                 }
             }
              id={index} size="small" color="inherit" 
             style={{   
                position:"absolute",
                left:"0px", top:"-8px", display:"inline-block"}}
            >
              {/* הסרה */}
              <DeleteOutlinedIcon/>

            </IconButton>
            
              <Typography gutterBottom variant="h5" component="h2">
                {basketItem.productHeader}
              </Typography>
             
              

              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              
                {basketItem.productDescription}
              
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                 {basketItem.units} 
              </Typography>
              


            </CardContent>
         
         
          
 
       <CardActions style={ { padding:"0px 16px 0px 16px" }} >
            <Typography variant="body2" color="primary" component="p" 
            style={{fontWeight:"bold"}}
            // {{borderStyle:"solid", borderWidth:"1px"}}
            >
                כמות: {basketItem.quantity} 
              </Typography>
              
              <Typography variant="body2" color="primary" component="p"
               style={{fontWeight:"bold" , marginRight:"auto"}}>
               
                 {parseFloat(basketItem.price)*(basketItem.quantity)}
                {' \u20AA'} {'כולל מע"מ'}
              </Typography>
              
           
          
        </CardActions>
        </Grid>
        
          </Grid>
      
        </div>
         )
        })}
        </Card>
        
    </div>
        
      );
    }
