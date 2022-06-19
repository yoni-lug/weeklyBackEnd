    import React from 'react';
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
     const orders=props.shoppingCart
  
   
      console.log("this is the shopping Cart")
      console.log(props.shoppingCart)
      const classes = useStyles();
      
      function handelRemoveClick (id,event){
        
        return (
          props.removeOrder(id)
        )
      }

      function handleContinueShopping (){
        // console.log("contineShopping")
        return props.continueShopping.whatToShow();
        }
      
        return (
        <div className={classes.root}>
         {/* BUTTOMS PART */}
         <div className={classes.buttomDiv }>
         <Button className={classes.buttom} variant="contained">
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
        {orders.map (function (order,index){
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
                 handelRemoveClick(order._id,event)
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
                {order.productHeader}
              </Typography>
             
              

              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              
                {order.productDescription}
              
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                 {order.units} 
              </Typography>
              


            </CardContent>
         
         
          
 
       <CardActions style={ { padding:"0px 16px 0px 16px" }} >
            <Typography variant="body2" color="primary" component="p" 
            style={{fontWeight:"bold"}}
            // {{borderStyle:"solid", borderWidth:"1px"}}
            >
                כמות: {order.quantity} 
              </Typography>
              
              <Typography variant="body2" color="primary" component="p"
               style={{fontWeight:"bold" , marginRight:"auto"}}>
               
                 {parseFloat(order.price)*(order.quantity)}
                {' \u20AA'} {'כולל מע"מ'}
              </Typography>
              
           
          
        </CardActions>
        </Grid>
        
          </Grid>
         {/* </CardActionArea> */}
        </div>
         )
        })}
        </Card>
        
    </div>
        
      );
    }
